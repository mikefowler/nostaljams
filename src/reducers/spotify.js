import User from '../models/User';
import {
  LOGOUT_SUCCEEDED,
  LOGIN_SUCCEEDED,
  FETCH_USER_SUCCEEDED,
} from '../actions/spotify';

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  user: new User(),
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
    case LOGOUT_SUCCEEDED:
      return initialState;
    case FETCH_USER_SUCCEEDED:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
}
