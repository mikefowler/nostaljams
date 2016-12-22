import { List } from 'immutable';

import Chart from '../models/Chart';
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

const initialState = {
  charts: new ChartMap(),
  tracks: new List(),
  username: null,
};

export default function reducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case LOGOUT_SUCCEEDED:
      return initialState;
    case USERNAME_UPDATED:
      return {
        ...state,
        username: payload,
      };
    case USERNAME_RESET:
      return {
        ...state,
        username: null,
        tracks: new List(),
        charts: new ChartMap(),
      };
    case FETCH_WEEKLY_CHART_LIST_SUCCEEDED:
      return {
        ...state,
        charts: state.charts.merge(payload),
      };
    case FETCH_WEEKLY_TRACKS_SUCCEEDED:
      return {
        ...state,
        tracks: action.payload.entities && action.payload.entities.track,
        artists: action.payload.entities && action.payload.entities.artist,
      };
    default:
      return state;
  }
}
