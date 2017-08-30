/* global describe, it */
import { expect } from 'chai';
import JsonConverter from '../../src/main';

describe('[test case] => math', () => {

  let results = null;

  const dataSet = {
    price: 20,
    promo: 15,
    prices: [{
      price: 20,
      promo: 15,
    }]
  };

  const instructions = [
    [
      ['price', 'promo', ['copy', 'math-sum'], 'fullPrice'],
      ['price', 'promo', ['copy', 'math-minus'], 'minPrice'],
    ],
    [
      ['prices[].price', 'prices[].promo', ['copy', 'math-sum'], 'fullPrice'],
      ['prices[].price', 'prices[].promo', ['copy', 'math-minus'], 'minPrice'],
    ],
  ];

  before(() => {
    const converter = new JsonConverter(dataSet);
    results = converter.convert(instructions);
  });

  it('instruction [ 1 ] => sum of "price" and "promo" as "fullPrice"', () => {
    expect(results.price).to.be.not.undefined;
    expect(results.promo).to.be.not.undefined;
    expect(results.fullPrice).to.be.equal(35);
  });

  it('instruction [ 1 ]  => minus of "price" and "promo" as "minPrice"', () => {
    expect(results.price).to.be.not.undefined;
    expect(results.promo).to.be.not.undefined;
    expect(results.minPrice).to.be.equal(5);
  });

  it('instruction [ 2 ] => sum of "price" and "promo" as "fullPrice" ( nested )', () => {
    expect(results.prices[0].price).to.be.not.undefined;
    expect(results.prices[0].promo).to.be.not.undefined;
    expect(results.prices[0].fullPrice).to.be.equal(35);
  });

  it('instruction [ 2 ]  => minus of "price" and "promo" as "minPrice" ( nested )', () => {
    expect(results.prices[0].price).to.be.not.undefined;
    expect(results.prices[0].promo).to.be.not.undefined;
    expect(results.prices[0].minPrice).to.be.equal(5);
  });

});
