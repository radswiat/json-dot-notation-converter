import merge from 'lodash/merge';
import get from 'lodash/get';
import set from 'lodash/set';
import unset from 'lodash/unset';

export default class JsonConverter {

  static HasArrayRegex = /\[\]/;
  static HasAnyRegex = /^(\*)/;

  // contains final output
  output = {};

  constructor(json) {
    this.json = json;
  }

  /**
   * Convert
   * - start converting
   * - return output on finish
   * @param instructions
   * @return {*}
   */
  convert(instructions) {
    // for each instructions
    for (const instruction of instructions) {
      this._handleInstruction(instruction);
    }
    // merge final output
    this.output = merge(this.json, this.output);
    // return
    return this._onceFinished();
  }

  /**
   * Handle single instruction
   * @private
   */
  _handleInstruction(instruction) {
    for (const inst of instruction) {
      this._executeInstructions(inst[0], inst[1], inst[2] || []);
    }
    // this.json = merge(this.json, this.output);
    this.json = merge(this.output, this.json);
  }

  _toLRObject(path) {
    let paths = path.split('.');
    let lhs = [], arr = null, rhs = [];
    for (let _path of paths) {
      if (arr) {
        rhs.push(_path);
      } else if (/\[\]/.test(_path)) {
        arr = _path.replace(/\[\]/, '');
      } else {
        lhs.push(_path);
      }
    }
    return {
      lhs, rhs, arr
    };
  }

  _toLRAnyStar(path) {
    let paths = path.split('.');
    let lhs = [], arr = null, rhs = [];
    for (let _path of paths) {
      if (arr) {
        rhs.push(_path);
      } else if (JsonConverter.HasAnyRegex.test(_path)) {
        arr = _path;
      } else {
        lhs.push(_path);
      }
    }
    return {
      lhs, rhs, arr
    };
  }

  _executeInstructions(lhs, rhs, flags, rhsKey, rhsAnyKey) {

    if (JsonConverter.HasAnyRegex.test(lhs)) {
      let LRStar = this._toLRAnyStar(lhs);
      if (LRStar.lhs.length) {
        return;
      }
      for (let key in this.json) {
        if (key !== '_stats' && key !== '_errors') {
          let newLhs = `${key}.${LRStar.rhs.join('.')}`;
          this._executeInstructions(newLhs, rhs, flags, rhsKey, key);
        }
      }
      return;
    }

    // "*" handling
    if (JsonConverter.HasAnyRegex.test(rhs)) {
      rhs = rhs.replace(JsonConverter.HasAnyRegex, rhsAnyKey);
    }

    // if LHS got any un-specified array ( ex: items[] )
    // extract it, get data for that array, and loop through all items and make a recursive call
    if (JsonConverter.HasArrayRegex.test(lhs)) {
      let LRObject = this._toLRObject(lhs);
      let partialLhsPath = `${LRObject.lhs.join('.')}.${LRObject.arr}`.replace(/^\./, '');
      // lets get the array value, to iterate through it
      let arrayValue = get(this.json, partialLhsPath);
      for (let key in arrayValue) {
        let lhsPath = `${LRObject.lhs.join('.')}.${LRObject.arr}[${key}].${LRObject.rhs.join('.')}`
          .replace(/^\./, '');
        this._executeInstructions(lhsPath, rhs, flags, key);
      }
      return;
    }

    // if RGS got un-specified array ( ex: items[] )
    // extract it ...
    if (JsonConverter.HasArrayRegex.test(rhs)) {
      let LRObject = this._toLRObject(rhs);
      let rhsPath = `${LRObject.lhs.join('.')}.${LRObject.arr}[${rhsKey}].${LRObject.rhs.join('.')}`
        .replace(/^\./, '');
      this._executeInstructions(lhs, rhsPath, flags, rhsKey);
      return;
    }

    let value = get(this.json, lhs);

    // remove original value if copy flag is not set
    if (flags.indexOf('copy') < 0) {
      unset(this.json, lhs);
    }

    // fix: if last char is . remove it
    rhs = rhs.replace(/\.$/, '');

    // if lhs is not an array, but rhs is an array,
    // we need to merge before setting
    if (/\]$/.test(rhs) && !/\]$/.test(lhs)) {
      value = merge(get(this.output, rhs), value);
    }

    set(this.output, rhs, value);
  }

  _onceFinished() {
    return this.output;
  }
}
