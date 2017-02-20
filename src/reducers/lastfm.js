import { Map, OrderedMap } from 'immutable';
import { handleActions } from 'redux-actions';

import { ChartMap } from '../store/models';
import { parseTracks, parseArtists, parseCharts } from '../store/parsers/lastfm';

import {
  login,
  logout,
  fetchWeeklyChartList,
  fetchChartsForWeek,
} from '../actions/lastfm';

const initialState = new Map({
  artists: new OrderedMap(),
  charts: new ChartMap(),
  tracks: new OrderedMap(),
  isLoggedIn: false,
  sessionKey: null,
  user: null,
});

export default handleActions({

  [login]: (state, action) => state.merge({
    isLoggedIn: true,
    sessionKey: action.payload.key,
    user: action.payload.name,
  }),

  [logout]: () => initialState,

  [fetchWeeklyChartList]: (state, action) => state.set(
    'charts',
    parseCharts(action.payload),
  ),

  [fetchChartsForWeek]: (state, action) => state.merge({
    tracks: parseTracks(action.payload.tracks),
    artists: parseArtists(action.payload.artists),
  }),

}, initialState);
