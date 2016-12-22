import { expect } from 'chai';

const dateStringToTimestamp = __helper.requireDefault('utils/dateStringToTimestamp');

describe('dateStringToTimestamp', () => {
  it('returns the timestamp of a given date string', () => {
    const year = 2016;
    const month = 12;
    const day = 19;
    const expectedOutput = new Date(year, month, day).getTime();
    const actualOutput = dateStringToTimestamp(`${year}-${month}-${day}`);

    expect(actualOutput).to.equal(expectedOutput);
  });
});
