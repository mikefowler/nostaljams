import { logout as logoutSpotify } from './spotify';
import { logout as logoutLastFM } from './lastfm';

export function logout() {
  return (dispatch) => {
    dispatch(logoutSpotify());
    dispatch(logoutLastFM());
  };
}
