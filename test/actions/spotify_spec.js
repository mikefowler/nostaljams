import { expect } from 'chai';

const actions = __helper.requireDefault('actions/spotify');

describe('auth action creators', () => {
  it('generates an action that redirects the browser to spotify', () => {
    const expectedAction = {
      type: actions.LOGIN_REQUEST,
    };

    const options = { test: 'test' };
    const result = actions.login(options);

    expect(result).to.deep.equal(expectedAction);
  });

  it('generates an action that sets the Spotify access token', () => {
    const payload = '123';
    const expectedAction = {
      type: actions.LOGIN_SUCCESS,
      payload,
    };

    expect(actions.setAccessToken(payload)).to.deep.equal(expectedAction);
  });
});
