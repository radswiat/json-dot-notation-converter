/* global describe, it */
import { expect } from 'chai';
import JsonConverter from '../../src/main';
import chalk from 'chalk';

describe('[specific test case] => addresses', () => {

  let results = null;

  const dataSet = {
    arr: [
      {
        a: 'London',
        b: 'BR54HD',
        nested: {
          a: 'John doe',
          b: '28',
          c: 'UK',
        }
      }
    ]
  };

  const instructions = [
    [
      ['arr', 'customers'],
    ],
    [
      ['customers[].a', 'customers[].city'],
      ['customers[].b', 'customers[].postcode'],
      ['customers[].nested', 'customers[].user'],
    ],
    [
      ['customers[].user.a', 'customers[].user.name'],
      ['customers[].user.b', 'customers[].user.age'],
      ['customers[].user.c', 'customers[].country'],
    ]
  ];

  before(() => {
    const converter = new JsonConverter(dataSet);
    results = converter.convert(instructions);
  });

  it('instruction [ 1 ] => "arr[]" should be re-named to "customers"', () => {
    expect(results.arr).to.be.undefined;
    expect(results.customers).to.not.be.undefined;
  });

  it('instruction [ 2 ] => "customers[].a" should be re-named to "customers[].city"', () => {
    expect(results.customers[0].a).to.be.undefined;
    expect(results.customers[0].city).to.be.equal('London');
  });

  it('instruction [ 2 ] => "customers[].b" should be re-named to "customers[].postcode"', () => {
    expect(results.customers[0].b).to.be.undefined;
    expect(results.customers[0].postcode).to.be.equal('BR54HD');
  });

  it('instruction [ 2 ] => "customers[].nested" should be re-named to "customers[].user"', () => {
    expect(results.customers[0].nested).to.be.undefined;
    expect(results.customers[0].user).to.not.be.undefined;
  });

  it('instruction [ 3 ] => "customers[].user.a" should be re-named to "customers[].user.name"', () => {
    expect(results.customers[0].user.a).to.be.undefined;
    expect(results.customers[0].user.name).to.be.equal('John doe');
  });

  it('instruction [ 3 ] => "customers[].user.b" should be re-named to "customers[].user.age"', () => {
    expect(results.customers[0].user.b).to.be.undefined;
    expect(results.customers[0].user.age).to.be.equal('28');
  });

  it('instruction [ 3 ] => "customers[].user.c" should be re-named and moved to "customers[].country"', () => {
    expect(results.customers[0].user.c).to.be.undefined;
    expect(results.customers[0].country).to.be.equal('UK');
  });
});
