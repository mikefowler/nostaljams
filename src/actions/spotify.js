import spotify from '../utils/spotify';
import * as parsers from '../parsers/spotify';

export const LOGOUT = 'spotify/LOGOUT';

export const LOGIN_REQUEST = 'spotify/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'spotify/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'spotify/LOGIN_FAILURE';

export const FETCH_USER_REQUEST = 'spotify/FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'spotify/FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'spotify/FETCH_USER_FAILURE';

// Fetching the authenticated user

function fetchUserRequested() {
  return {
    type: FETCH_USER_REQUEST,
  };
}

function fetchUserSucceeded(response) {
  const payload = parsers.parseUser(response);

  return {
    type: FETCH_USER_SUCCESS,
    payload,
  };
}

function fetchUserFailed(payload) {
  return {
    type: FETCH_USER_FAILURE,
    error: true,
    payload,
  };
}

export function fetchUser() {
  return (dispatch) => {
    // Initial dispatch to indicate that the request has been made
    dispatch(fetchUserRequested());

    // Request the authenticated user's data from the Spotify API
    spotify.getMe((err, data) => {
      if (err) {
        dispatch(fetchUserFailed(err.message));
      } else {
        dispatch(fetchUserSucceeded(data));
      }
    });
  };
}

// Authentication

export function login() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function setAccessToken(payload) {
  return (dispatch) => {
    // First set the access token in the store
    dispatch({
      type: LOGIN_SUCCESS,
      payload,
    });

    // Set the access token for our instance of the Spotify API client
    spotify.setAccessToken(payload);

    // And then trigger a second action to fetch the Spotify user
    dispatch(fetchUser());
  };
}
