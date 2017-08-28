/* global describe, it */
import { expect } from 'chai';
import JsonConverter from '../src/main';

describe('client', () => {
  it('should be defined', () => {
    expect(JsonConverter).to.not.be.undefined;
  });

  it('should be defined', () => {
    expect(new JsonConverter()).to.not.be.undefined;
  });
});
