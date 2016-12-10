import { expect } from 'chai';

const actions = __helper.requireDefault('actions/auth');

describe('auth action creators', () => {
  it('generates an action that redirects the browser to spotify', () => {
    const expectedAction = {
      type: actions.LOGIN_REQUESTED,
    };

    const options = { test: 'test' };
    const result = actions.loginWithSpotify(options);

    expect(result).to.deep.equal(expectedAction);
  });

  it('generates an action that sets the Spotify access token', () => {
    const payload = '123';
    const expectedAction = {
      type: actions.LOGIN_SUCCEEDED,
      payload,
    };

    expect(actions.setAccessToken(payload)).to.deep.equal(expectedAction);
  });
});
