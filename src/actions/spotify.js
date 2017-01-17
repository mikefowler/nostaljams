import spotify from '../utils/spotify';
import parsers from '../store/parsers';

export const LOGOUT = 'spotify/LOGOUT';

export const LOGIN_REQUEST = 'spotify/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'spotify/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'spotify/LOGIN_FAILURE';

export const FETCH_USER_REQUEST = 'spotify/FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'spotify/FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'spotify/FETCH_USER_FAILURE';

export const LOOKUP_TRACKS_REQUEST = 'spotify/LOOKUP_TRACKS_REQUEST';
export const LOOKUP_TRACKS_SUCCESS = 'spotify/LOOKUP_TRACKS_SUCCESS';
export const LOOKUP_TRACKS_FAILURE = 'spotify/LOOKUP_TRACKS_FAILURE';

// Fetching the authenticated user

function fetchUserRequested() {
  return {
    type: FETCH_USER_REQUEST,
  };
}

function fetchUserSucceeded(payload) {
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

// Search for track(s) and return matches

function lookupTracksRequest() {
  return {
    type: LOOKUP_TRACKS_REQUEST,
  };
}

function lookupTracksSuccess(payload) {
  return {
    type: LOOKUP_TRACKS_SUCCESS,
    payload,
  };
}

function lookupTracksFailure(payload) {
  return {
    type: LOOKUP_TRACKS_FAILURE,
    error: true,
    payload,
  };
}

export function lookupTracks(tracks) {
  return (dispatch) => {
    lookupTracksRequest();

    const promises = tracks.map(track => (
      spotify.searchTracks(`track:${track.name} artist:${track.artist}`)
    ));

    return Promise.all(promises).then((results) => {
      console.log(results);
    });
  };
}

window.lookupTracks = lookupTracks;
