import { Map, List } from 'immutable';

import ChartMap from '../models/ChartMap';

import {
  FETCH_WEEKLY_CHART_LIST_SUCCEEDED,
  FETCH_WEEKLY_TRACKS_SUCCEEDED,
  USERNAME_UPDATED,
  USERNAME_RESET,
} from '../actions/lastfm';

import {
  LOGOUT_SUCCEEDED,
} from '../actions/spotify';

const initialState = new Map({
  charts: new ChartMap(),
  tracks: [],
  username: '',
});

export default function reducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case LOGOUT_SUCCEEDED:
      return initialState;
    case USERNAME_UPDATED:
      return state.set('username', payload);
    case USERNAME_RESET:
      return state.merge({
        username: null,
        tracks: new List(),
        charts: new ChartMap(),
      });
    case FETCH_WEEKLY_CHART_LIST_SUCCEEDED:
      return state.set('charts', payload);
    case FETCH_WEEKLY_TRACKS_SUCCEEDED:
      return state.merge({
        tracks: action.payload.entities && action.payload.entities.track,
        artists: action.payload.entities && action.payload.entities.artist,
      });
    default:
      return state;
  }
}
