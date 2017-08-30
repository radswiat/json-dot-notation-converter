/* global describe, it */
import { expect } from 'chai';
import JsonConverter from '../../src/main';
import chalk from 'chalk';

describe('[test case] => merge', () => {

  let results = null;

  const dataSet = {
    a: 'A value',
    nested: {
      b: 'B value',
      sub: {
        a: 'A value',
      }
    },
    arr: [{
      a: 'A value',
      sub: {
        b: 'B value'
      }
    }]
  };

  const instructions = [
    [
      ['nested.sub', 'nested', ['merge']],
    ],
    [
      ['arr[].sub', 'arr[]', ['merge']]
    ]
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

  it('instruction [ 2 ] => "arr[].sub" should be merged with "arr[]"', () => {
    expect(results.arr[0].sub).to.be.undefined;
    expect(results.arr[0].a).to.be.equal('A value');
    expect(results.arr[0].b).to.be.equal('B value');
  });
});
