import Spotify from 'spotify-web-api-js';
import qs from 'qs';

import { SPOTIFY_OAUTH_URL } from './constants';

export function loginViaOAuth(options = {}) {
  window.location = `${SPOTIFY_OAUTH_URL}?${qs.stringify(options)}`;
}

export default new Spotify();
