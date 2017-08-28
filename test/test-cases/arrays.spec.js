/* global describe, it */
import { expect } from 'chai';
import JsonConverter from '../../src/main';

describe('[test case] => arrays', () => {

  let results = null;

  const dataSet = {
    arr: [
      {
        a: 'A value',
        b: '2',
        c: 'C value',
        nested: {
          a: 'A value',
          b: '2',
          c: 'C value',
          sub: {
            a: 'A value',
            b: '2',
            c: 'C value',
          }
        }
      }
    ]
  };

  const instructions = [
    [
      ['arr[].a', 'arr[].b'],
      ['arr[].c', 'arr[].d']
    ],
    [
      ['arr[].nested.a', 'arr[].nested.b'],
      ['arr[].nested.c', 'arr[].nested.d']
    ],
    [
      ['arr[].nested.sub.a', 'arr[].nested.sub.b'],
      ['arr[].nested.sub.c', 'arr[].nested.sub.d']
    ]
  ];

  before(() => {
    const converter = new JsonConverter(dataSet);
    results = converter.convert(instructions);
  });

  it('instruction [ 1 ] => "arr[].a" should be re-named to "arr[].b"', () => {
    expect(results.arr[0].a).to.be.undefined;
    expect(results.arr[0].b).to.be.equal('A value');
  });

  it('instruction [ 1 ] => "arr[].c" should be re-named to "arr[].d"', () => {
    expect(results.arr[0].c).to.be.undefined;
    expect(results.arr[0].d).to.be.equal('C value');
  });

  it('instruction [ 2 ] => "arr[].nested.a" should be re-named to "arr[].nested.b"', () => {
    expect(results.arr[0].nested.a).to.be.undefined;
    expect(results.arr[0].nested.b).to.be.equal('A value');
  });

  it('instruction [ 2 ] => "arr[].nested.c" should be re-named to "arr[].nested.d"', () => {
    expect(results.arr[0].nested.c).to.be.undefined;
    expect(results.arr[0].nested.d).to.be.equal('C value');
  });

  it('instruction [ 3 ] => "arr[].nested.sub.a" should be re-named to "arr[].nested.sub.b"', () => {
    expect(results.arr[0].nested.a).to.be.undefined;
    expect(results.arr[0].nested.b).to.be.equal('A value');
  });

  it('instruction [ 3 ] => "arr[].nested.sub.c" should be re-named to "arr[].nested.sub.d"', () => {
    expect(results.arr[0].nested.sub.c).to.be.undefined;
    expect(results.arr[0].nested.sub.d).to.be.equal('C value');
  });

});
