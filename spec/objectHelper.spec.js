
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const sinon = require('sinon');
const assert = chai.assert;
const target = require('../objectHelper');
chai.should();

describe('objectToArray', () => {
  it('convert object to array', () => {
    const obj = {
      foo: 5,
      bar: 3
    }
    const result = target.objectToArray(obj);
    console.log(result)

    const expected = [
      { key: 'foo', value: 5 },
      { key: 'bar', value: 3 }
    ];
    expect(result).to.deep.equal(expected);
  });
});

describe('getGreaterThanZeroValuesFromObject', () => {
  it('return greater than zero values', () => {
    const obj = {
      foo: 5,
      bar: 3,
      zoo: 0
    }
    const result = target.getGreaterThanZeroValuesFromObject(obj);
    console.log(result)

    const expected = [
      { key: 'foo', value: 5 },
      { key: 'bar', value: 3 }
    ];
    expect(result).to.deep.equal(expected);
  });
});
