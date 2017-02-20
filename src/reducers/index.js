import { combineReducers } from 'redux';

import app from './app';
import spotify from './spotify';
import lastfm from './lastfm';

export default combineReducers({
  app,
  spotify,
  lastfm,
});
