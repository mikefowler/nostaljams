import qs from 'qs';

export default function authenticateWithSpotify(options = {}) {
  window.location = `https://accounts.spotify.com/authorize?${qs.stringify(options)}`;
}
