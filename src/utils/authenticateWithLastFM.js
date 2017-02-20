import qs from 'qs';
import { LASTFM_OAUTH_URL } from './constants';

export default function authenticateWithLastFM(options = {}) {
  window.location = `${LASTFM_OAUTH_URL}?${qs.stringify(options)}`;
}
