/* global describe, it */
import { expect } from 'chai';
import JsonConverter from '../../src/main';

describe('[test case] => asterix', () => {

  let results = null;

  const dataSet = {
    node1: {
      a: 'A value'
    },
    node2: {
      a: 'A value'
    },
    node3: {
      a: 'A value'
    },
    test: {
      a: 'A value'
    }
  };

  const instructions = [
    [
      ['*.a', '*.b'],
    ],
    [
      ['nested.*.a', 'nested.*.b'],
    ],
  ];

  before(() => {
    const converter = new JsonConverter(dataSet);
    results = converter.convert(instructions);
  });

  it('instruction [ 1 ] => "a" should be re-named to "b"', () => {
    expect(results.node1.a).to.be.undefined;
    expect(results.node1.b).to.be.equal('A value');
    expect(results.node2.a).to.be.undefined;
    expect(results.node2.b).to.be.equal('A value');
    expect(results.node3.a).to.be.undefined;
    expect(results.node3.b).to.be.equal('A value');
    expect(results.test.a).to.be.undefined;
    expect(results.test.b).to.be.equal('A value');
  });


});
