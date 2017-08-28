/* global describe, it */
import { expect } from 'chai';
import JsonConverter from '../../src/main';

describe('[test case] => merge', () => {

  let results = null;

  const dataSet = {
    a: 'A value',
    nested: {
      b: 'B value',
      sub: {
        a: 'A value',
      }
    }
  };

  const instructions = [
    [
      ['nested.sub', 'nested'],
    ],
  ];

  before(() => {
    const converter = new JsonConverter(dataSet);
    results = converter.convert(instructions);
  });

  it('instruction [ 1 ] => "nested.sub" should be merged with "nested"', () => {
    expect(results.nested.sub).to.be.undefined;
    expect(results.nested.a).to.be.equal('A value');
    expect(results.nested.b).to.be.equal('B value');
  });

});
