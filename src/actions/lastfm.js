import lastfm from '../utils/lastfm';
import * as parsers from '../parsers/lastfm';

// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------

export const FETCH_WEEKLY_CHART_LIST_REQUESTED = 'lastfm/FETCH_WEEKLY_CHART_LIST_REQUESTED';
export const FETCH_WEEKLY_CHART_LIST_SUCCEEDED = 'lastfm/FETCH_WEEKLY_CHART_LIST_SUCCEEDED';
export const FETCH_WEEKLY_CHART_LIST_FAILED = 'lastfm/FETCH_WEEKLY_CHART_LIST_FAILED';

export const FETCH_WEEKLY_TRACKS_REQUESTED = 'lastfm/FETCH_WEEKLY_TRACKS_REQUESTED';
export const FETCH_WEEKLY_TRACKS_SUCCEEDED = 'lastfm/FETCH_WEEKLY_TRACKS_SUCCEEDED';
export const FETCH_WEEKLY_FAILED = 'lastfm/FETCH_WEEKLY_FAILED';

export const USERNAME_UPDATED = 'lastfm/USERNAME_UPDATED';
export const USERNAME_RESET = 'lastfm/USERNAME_RESET';

// ----------------------------------------------------------------------------
// Action Creators
// ----------------------------------------------------------------------------

// Fetch a LastFM user's list of available weekly charts

function fetchWeeklyChartListRequested() {
  return {
    type: FETCH_WEEKLY_CHART_LIST_REQUESTED,
  };
}

function fetchWeeklyChartListSucceeded(response) {
  const payload = parsers.parseCharts(response);

  return {
    type: FETCH_WEEKLY_CHART_LIST_SUCCEEDED,
    payload,
  };
}

function fetchWeeklyChartListFailed(err) {
  return {
    type: FETCH_WEEKLY_CHART_LIST_FAILED,
    error: true,
    payload: err.message,
  };
}

export function fetchWeeklyChartList() {
  return (dispatch, getState) => {
    // Dispatch the request action
    dispatch(fetchWeeklyChartListRequested());

    // Get the LastFM username from the store Redux store
    const { username } = getState().lastfm;

    // Make a request to the LastFM API
    return lastfm
      .get('user.getWeeklyChartList', {
        user: username,
      })
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
    type: FETCH_WEEKLY_TRACKS_REQUESTED,
  };
}

function fetchWeeklyTrackChartFailed(err) {
  return {
    type: FETCH_WEEKLY_FAILED,
    error: true,
    payload: err.message,
  };
}

function fetchWeeklyTrackChartSucceeded(response) {
  return {
    type: FETCH_WEEKLY_TRACKS_SUCCEEDED,
    payload: response,
  };
}

export function fetchWeeklyTrackChart(startDate = null, endDate = null) {
  return (dispatch, getState) => {
    dispatch(fetchWeeklyTrackChartRequest());

    const { username } = getState().lastfm;

    return lastfm
      .get('user.getweeklytrackchart', {
        user: username,
        from: startDate,
        to: endDate,
      })
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
      type: USERNAME_UPDATED,
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
