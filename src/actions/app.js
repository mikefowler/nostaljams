import { createAction } from 'redux-actions';

import { logout as logoutSpotify } from './spotify';
import { logout as logoutLastFM } from './lastfm';

export function logout() {
  return (dispatch) => {
    dispatch(logoutSpotify());
    dispatch(logoutLastFM());
  };
}

export const savePlaylist = createAction('app/SAVE_PLAYLIST', async () => {

});
