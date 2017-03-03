import { Map } from 'immutable';
import { handle } from 'redux-pack';

import { parseUser, parseTrack } from '../store/parsers/spotify';
import {
  LOGIN,
  LOGOUT,
  LOOKUP_TRACK,
} from '../actions/spotify';

const initialState = new Map({
  isLoggedIn: false,
  accessToken: null,
  user: null,
  tracks: new Map(),
});

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case LOGIN:
      return handle(state, action, {
        success: s => s.merge({
          isLoggedIn: true,
          accessToken: action.meta.accessToken,
          user: parseUser(action.payload),
        }),
      });

    case LOGOUT:
      return initialState;

    case LOOKUP_TRACK:
      return handle(state, action, {
        success: (s) => {
          const { items, total } = payload;

          if (total === 0) return state;

          // @TODO: is there a way to do some smarter matching beyond the first result?
          const track = items[0];

          return s.setIn(
            ['tracks', track.id],
            parseTrack(track),
          );
        },
      });

    default:
      return state;
  }
}
