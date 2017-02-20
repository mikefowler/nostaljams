// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------

import qs from 'qs';
import md5 from 'md5';

import { LASTFM_OAUTH_URL, LASTFM_API_KEY, LASTFM_API_SECRET } from './constants';

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------

let sessionKey;

// Given an object of request parameters, generates a method
// signature used to make authenticated requests to the API.
function getSignature(params) {
  // To generate the signature we will concatenate our request
  // parameters, both keys and values, into a single string.
  let signature = '';

  // Collect the parameter object's keys, sort them
  // alphabetically, and then append each key/value
  // pair to a string.
  Object.keys(params).sort().forEach(key => (signature += key + params[key]));

  // Add the secret to the end of the string
  signature += LASTFM_API_SECRET;

  // Return an md5 hash of the string we've just assembled
  return md5(signature);
}

// Makes a request to the LastFM API
function request(method = 'GET', endpoint, options) {
  const {
    authenticated,
    ...query
  } = options;

  query.method = endpoint;
  query.api_key = LASTFM_API_KEY;

  if (sessionKey) {
    query.sk = sessionKey;
  }

  if (authenticated) {
    query.api_sig = getSignature(query);
  }

  query.format = 'json';

  const url = `https://ws.audioscrobbler.com/2.0?${qs.stringify(query)}`;

  return new Promise((resolve, reject) => {
    fetch(url, { method })
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

// Redirects the browser to the LastFM OAuth page for
// a user to log in.
export function loginViaOAuth(options = {}) {
  window.location = `${LASTFM_OAUTH_URL}?${qs.stringify(options)}`;
}

export default {

  auth: {

    getSession(options = {}) {
      return request('GET', 'auth.getSession', { ...options, authenticated: true });
    },

  },

  user: {

    getWeeklyChartList(options = {}) {
      return request('GET', 'user.getweeklychartlist', options);
    },

    getWeeklyAlbumChart(options = {}) {
      return request('GET', 'user.getweeklyalbumchart', options);
    },

    getWeeklyArtistChart(options = {}) {
      return request('GET', 'user.getweeklyartistchart', options);
    },

    getWeeklyTrackChart(options = {}) {
      return request('GET', 'user.getweeklytrackchart', options);
    },

  },

  setSessionKey(key) {
    sessionKey = key;
  },

};
