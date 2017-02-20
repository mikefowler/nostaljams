import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import { parseUser, parseTrack } from '../store/parsers/spotify';
import { login, logout, lookupTrack } from '../actions/spotify';

const initialState = new Map({
  isLoggedIn: false,
  accessToken: null,
  user: null,
  tracks: new Map(),
});

export default handleActions({

  [login]: (state, action) => state.merge({
    isLoggedIn: true,
    accessToken: action.meta.accessToken,
    user: parseUser(action.payload),
  }),

  [logout]: () => initialState,

  [lookupTrack]: (state, action) => {
    const { payload } = action;
    const { items, total } = payload;

    if (total === 0) return state;

    // @TODO: is there a way to do some smarter matching beyond the first result?
    const track = items[0];

    return state.setIn(
      ['tracks', track.id],
      parseTrack(track),
    );
  },

}, initialState);
