import { expect } from 'chai';
import { REHYDRATE } from 'redux-persist/constants';

const reducer = __helper.requireDefault('reducers/app');

describe('app reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal({
      isBootstrapped: false,
    });
  });

  it('handles redux-persist\'s REHYDRATE', () => {
    const initialState = { isBootstrapped: false };
    const action = { type: REHYDRATE };
    const expectedState = { isBootstrapped: true };

    expect(reducer(initialState, action)).to.deep.equal(expectedState);
  });
});
