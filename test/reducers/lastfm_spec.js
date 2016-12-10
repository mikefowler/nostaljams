import { expect } from 'chai';

const reducer = __helper.requireDefault('reducers/lastfm');
const actions = __helper.requireDefault('actions/lastfm');

const initialReducerState = {
  tracks: [],
  username: null,
};

describe('lastfm reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialReducerState);
  });

  it('handles lastfm/USERNAME_UPDATED', () => {
    const initialState = { username: null };
    const action = { type: actions.USERNAME_UPDATED, payload: 'mike' };
    const expectedState = { username: 'mike' };

    expect(reducer(initialState, action)).to.deep.equal(expectedState);
  });

  it('handles lastfm/FETCH_WEEKLY_TRACKS_SUCCEEDED', () => {
    const payload = { tracks: [{ name: 'Two-Headed Boy' }] };
    const initialState = { tracks: [] };
    const action = { type: actions.FETCH_WEEKLY_TRACKS_SUCCEEDED, payload };
    const expectedState = { tracks: payload };

    expect(reducer(initialState, action)).to.deep.equal(expectedState);
  });
});
