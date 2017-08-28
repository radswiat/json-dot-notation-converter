/* global describe, it */
import { expect } from 'chai';
import JsonConverter from '../../src/main';

describe('[test case] => basic', () => {

  let results = null;

  const dataSet = {
    a: 'A value',
    b: '2',
    c: 'C value',
    w: 'w',
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
  };

  const instructions = [
    [
      ['a', 'b'],
      ['c', 'd']
    ],
    [
      ['nested.a', 'nested.b'],
      ['nested.c', 'nested.d']
    ],
    [
      ['nested.sub.a', 'nested.sub.b'],
      ['nested.sub.c', 'nested.sub.d']
    ]
  ];

  before(() => {
    const converter = new JsonConverter(dataSet);
    results = converter.convert(instructions);
  });

  it('instruction [ 1 ] => "a" should be re-named to "b"', () => {
    expect(results.a).to.be.undefined;
    expect(results.b).to.be.equal('A value');
  });

  it('instruction [ 1 ] => "d" should be re-named to "e"', () => {
    expect(results.c).to.be.undefined;
    expect(results.d).to.be.equal('C value');
  });

  it('instruction [ 2 ] => "nested.a" should be re-named to "nested.b"', () => {
    expect(results.nested.a).to.be.undefined;
    expect(results.nested.b).to.be.equal('A value');
  });

  it('instruction [ 2 ] => "nested.d" should be re-named to "nested.e"', () => {
    expect(results.nested.c).to.be.undefined;
    expect(results.nested.d).to.be.equal('C value');
  });

  it('instruction [ 3 ] => "nested.sub.a" should be re-named to "nested.sub.b"', () => {
    expect(results.nested.sub.a).to.be.undefined;
    expect(results.nested.sub.b).to.be.equal('A value');
  });

  it('instruction [ 3 ] => "nested.d" should be re-named to "nested.e"', () => {
    expect(results.nested.sub.c).to.be.undefined;
    expect(results.nested.sub.d).to.be.equal('C value');
  });
});
