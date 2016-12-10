import qs from 'qs';
import { LASTFM_API_KEY } from './constants';

export const API_URL = 'http://ws.audioscrobbler.com/2.0/';

function request(method = 'GET', endpoint, options) {
  const query = {
    ...options,
    api_key: LASTFM_API_KEY,
    method: endpoint,
    format: 'json',
  };

  const url = `${API_URL}?${qs.stringify(query)}`;
  return fetch(url).then(response => response.json());
}

export default {
  get(endpoint, options = {}) {
    return request('GET', endpoint, options);
  },
};
