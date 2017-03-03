import { Map, OrderedMap } from 'immutable';
import { handle } from 'redux-pack';

import { ChartMap } from '../store/models';
import { parseTracks, parseArtists, parseCharts } from '../store/parsers/lastfm';

import {
  LOGIN,
  LOGOUT,
  FETCH_WEEKLY_CHART_LIST,
  FETCH_CHARTS_FOR_WEEK,
} from '../actions/lastfm';

const initialState = new Map({
  artists: new OrderedMap(),
  charts: new ChartMap(),
  tracks: new OrderedMap(),
  isLoggedIn: false,
  sessionKey: null,
  user: null,

  isLoggingIn: false,
  isFetchingWeeklyChartList: false,
  isFetchingChartsForWeek: false,
});

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case LOGIN:
      return handle(state, action, {
        success: s => s.merge({
          isLoggedIn: true,
          sessionKey: payload.session.key,
          user: payload.session.name,
        }),
      });

    case LOGOUT:
      return initialState;

    case FETCH_WEEKLY_CHART_LIST:
      return handle(state, action, {
        start: s => s.set('isFetchingWeeklyChartList', true),
        finish: s => s.set('isFetchingWeeklyChartList', false),
        success: s => s.set('charts', parseCharts(action.payload.weeklychartlist)),
      });

    case FETCH_CHARTS_FOR_WEEK:
      return handle(state, action, {
        start: s => s.set('isFetchingChartsForWeek', true),
        finish: s => s.set('isFetchingWeeklyChartList', false),
        success: s => s.merge({
          tracks: parseTracks(action.payload[0].weeklytrackchart.track),
          artists: parseArtists(action.payload[1].weeklyartistchart.artist),
        }),
      });

    default:
      return state;
  }
}
