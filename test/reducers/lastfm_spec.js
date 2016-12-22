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

  it('handles lastfm/USERNAME_UPDATE', () => {
    const initialState = { username: null };
    const action = { type: actions.USERNAME_UPDATE, payload: 'mike' };
    const expectedState = { username: 'mike' };

    expect(reducer(initialState, action)).to.deep.equal(expectedState);
  });

  it('handles lastfm/FETCH_WEEKLY_TRACKS_SUCCESS', () => {
    const payload = {
      entities: {
        track: {
          1: {
            name: 'Two-Headed Boy',
            artist: 1,
          },
        },
        artist: {
          1: {
            name: 'Mike',
          },
        },
      },
    };
    const initialState = { tracks: [] };
    const action = { type: actions.FETCH_WEEKLY_TRACKS_SUCCESS, payload };
    const expectedState = { tracks: payload.entities.track, artists: payload.entities.artist };

    expect(reducer(initialState, action)).to.deep.equal(expectedState);
  });
});
