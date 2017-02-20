import qs from 'qs';
import { SPOTIFY_OAUTH_URL } from './constants';

export default function authenticateWithSpotify(options = {}) {
  window.location = `${SPOTIFY_OAUTH_URL}?${qs.stringify(options)}`;
}
