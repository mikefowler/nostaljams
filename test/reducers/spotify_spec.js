import { expect } from 'chai';

const reducer = __helper.requireDefault('reducers/spotify');
const actions = __helper.requireDefault('actions/spotify');

const initialReducerState = {
  isLoggedIn: false,
  accessToken: null,
};

describe('auth reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialReducerState);
  });

  it('handles auth/LOGIN_SUCCEEDED', () => {
    const initialState = { isLoggedIn: false, accessToken: null };
    const action = { type: actions.LOGIN_SUCCEEDED, payload: '123' };
    const expectedState = { isLoggedIn: true, accessToken: '123' };

    expect(reducer(initialState, action)).to.deep.equal(expectedState);
  });
});
