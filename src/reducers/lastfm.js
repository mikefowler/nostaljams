import { FETCH_WEEKLY_TRACKS_SUCCEEDED, USERNAME_UPDATED } from '../actions/lastfm';

const initialState = {
  tracks: [],
  username: null,
};

export default function reducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case FETCH_WEEKLY_TRACKS_SUCCEEDED:
      return {
        ...state,
        tracks: action.payload,
      };
    case USERNAME_UPDATED:
      return {
        ...state,
        username: payload,
      };
    default:
      return state;
  }
}
