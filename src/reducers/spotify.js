import { Map } from 'immutable';

import User from '../models/User';
import {
  LOGOUT,
  LOGIN_SUCCESS,
  FETCH_USER_SUCCESS,
} from '../actions/spotify';

const initialState = new Map({
  isLoggedIn: false,
  accessToken: null,
  user: new User(),
});

export default function reducer(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.merge({
        isLoggedIn: true,
        accessToken: payload,
      });
    case LOGOUT:
      return initialState;
    case FETCH_USER_SUCCESS:
      return state.set('user', payload);
    default:
      return state;
  }
}
