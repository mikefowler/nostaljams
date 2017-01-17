import { Map, List } from 'immutable';

import { ChartMap } from '../store/models';
import parsers from '../store/parsers';

import {
  FETCH_WEEKLY_CHART_LIST_SUCCESS,
  FETCH_CHARTS_FOR_WEEK_SUCCESS,
  USERNAME_UPDATE,
  USERNAME_RESET,
} from '../actions/lastfm';

import {
  LOGOUT,
} from '../actions/spotify';

const initialState = new Map({
  charts: new ChartMap(),
  tracks: [],
  username: '',
});

export default function reducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {

    case LOGOUT:
      return initialState;

    case USERNAME_UPDATE:
      return state.set('username', payload);

    case USERNAME_RESET:
      return state.merge({
        username: null,
        tracks: new List(),
        charts: new ChartMap(),
      });

    case FETCH_WEEKLY_CHART_LIST_SUCCESS:
      return state.set('charts', payload);

    case FETCH_CHARTS_FOR_WEEK_SUCCESS:
      return state.merge({
        tracks: parsers.lastfm.parseTracks(payload.tracks),
        artists: parsers.lastfm.parseArtists(payload.artists),
      });

    default:
      return state;
  }
}
