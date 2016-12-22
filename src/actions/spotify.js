import spotify from '../utils/spotify';
import * as parsers from '../parsers/spotify';

export const LOGOUT_SUCCEEDED = 'spotify/LOGOUT_SUCCEEDED';

export const LOGIN_REQUESTED = 'spotify/LOGIN_REQUESTED';
export const LOGIN_SUCCEEDED = 'spotify/LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'spotify/LOGIN_FAILED';

export const FETCH_USER_REQUESTED = 'spotify/FETCH_USER_REQUESTED';
export const FETCH_USER_SUCCEEDED = 'spotify/FETCH_USER_SUCCEEDED';
export const FETCH_USER_FAILED = 'spotify/FETCH_USER_FAILED';

// Fetching the authenticated user

function fetchUserRequested() {
  return {
    type: FETCH_USER_REQUESTED,
  };
}

function fetchUserSucceeded(response) {
  const payload = parsers.parseUser(response);

  return {
    type: FETCH_USER_SUCCEEDED,
    payload,
  };
}

function fetchUserFailed(payload) {
  return {
    type: FETCH_USER_FAILED,
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
    type: LOGIN_REQUESTED,
  };
}

export function logout() {
  return {
    type: LOGOUT_SUCCEEDED,
  };
}

export function setAccessToken(payload) {
  return (dispatch) => {
    // First set the access token in the store
    dispatch({
      type: LOGIN_SUCCEEDED,
      payload,
    });

    // Set the access token for our instance of the Spotify API client
    spotify.setAccessToken(payload);

    // And then trigger a second action to fetch the Spotify user
    dispatch(fetchUser());
  };
}
