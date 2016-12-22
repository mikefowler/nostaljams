import lastfm from '../utils/lastfm';
import * as parsers from '../parsers/lastfm';

// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------

export const FETCH_WEEKLY_CHART_LIST_REQUEST = 'lastfm/FETCH_WEEKLY_CHART_LIST_REQUEST';
export const FETCH_WEEKLY_CHART_LIST_SUCCESS = 'lastfm/FETCH_WEEKLY_CHART_LIST_SUCCESS';
export const FETCH_WEEKLY_CHART_LIST_FAILURE = 'lastfm/FETCH_WEEKLY_CHART_LIST_FAILURE';

export const FETCH_WEEKLY_TRACKS_REQUEST = 'lastfm/FETCH_WEEKLY_TRACKS_REQUEST';
export const FETCH_WEEKLY_TRACKS_SUCCESS = 'lastfm/FETCH_WEEKLY_TRACKS_SUCCESS';
export const FETCH_WEEKLY_TRACKS_FAILURE = 'lastfm/FETCH_WEEKLY_TRACKS_FAILURE';

export const USERNAME_UPDATE = 'lastfm/USERNAME_UPDATE';
export const USERNAME_RESET = 'lastfm/USERNAME_RESET';

// ----------------------------------------------------------------------------
// Action Creators
// ----------------------------------------------------------------------------

// Fetch a LastFM user's list of available weekly charts

function fetchWeeklyChartListRequested() {
  return {
    type: FETCH_WEEKLY_CHART_LIST_REQUEST,
  };
}

function fetchWeeklyChartListSucceeded(response) {
  const payload = parsers.parseCharts(response);

  return {
    type: FETCH_WEEKLY_CHART_LIST_SUCCESS,
    payload,
  };
}

function fetchWeeklyChartListFailed(err) {
  return {
    type: FETCH_WEEKLY_CHART_LIST_FAILURE,
    error: true,
    payload: err.message,
  };
}

export function fetchWeeklyChartList() {
  return (dispatch, getState) => {
    // Dispatch the request action
    dispatch(fetchWeeklyChartListRequested());

    // Get the LastFM username from the store Redux store
    const user = getState().lastfm.get('username');

    // Make a request to the LastFM API
    return lastfm.user.getWeeklyChartList({ user })
      .then((response) => {
        dispatch(fetchWeeklyChartListSucceeded(response));
      })
      .catch((err) => {
        dispatch(fetchWeeklyChartListFailed(err));
      });
  };
}

// Fetch a LastFM user's weekly track chart for a given start and end date

function fetchWeeklyTrackChartRequest() {
  return {
    type: FETCH_WEEKLY_TRACKS_REQUEST,
  };
}

function fetchWeeklyTrackChartFailed(err) {
  return {
    type: FETCH_WEEKLY_TRACKS_FAILURE,
    error: true,
    payload: err.message,
  };
}

function fetchWeeklyTrackChartSucceeded(response) {
  return {
    type: FETCH_WEEKLY_TRACKS_SUCCESS,
    payload: response,
  };
}

export function fetchWeeklyTrackChart(from = null, to = null) {
  return (dispatch, getState) => {
    dispatch(fetchWeeklyTrackChartRequest());

    const user = getState().lastfm.get('username');
    const options = { user, from, to };

    return lastfm.user.getWeeklyTrackChart(options)
      .then((response) => {
        let tracks = [];

        if (response.weeklytrackchart) {
          tracks = response.weeklytrackchart.track;
        }

        dispatch(fetchWeeklyTrackChartSucceeded(tracks));
      })
      .catch((err) => {
        dispatch(fetchWeeklyTrackChartFailed(err));
      });
  };
}

// Update LastFM username

export function updateUsername(username = null) {
  return (dispatch) => {
    // First update the username in the store
    dispatch({
      type: USERNAME_UPDATE,
      payload: username,
    });

    // And then dispatch a second action to fetch the weekly chart list for this username
    dispatch(fetchWeeklyChartList());
  };
}

export function resetUsername() {
  return {
    type: USERNAME_RESET,
  };
}
