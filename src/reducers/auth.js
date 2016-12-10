import { USERNAME_UPDATED } from '../actions/lastfm';
import { LOGIN_SUCCEEDED } from '../actions/auth';

const initialState = {
  isLoggedIn: false,
  accessToken: null,
};

export default function reducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        isLoggedIn: true,
        accessToken: payload,
      };
    case USERNAME_UPDATED:
      return {
        ...state,
        lastfmUsername: payload,
      };
    default:
      return state;
  }
}
