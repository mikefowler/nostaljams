import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import lastfm from './lastfm';

export default combineReducers({
  app,
  auth,
  lastfm,
});
