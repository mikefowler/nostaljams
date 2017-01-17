import lastfm from '../utils/lastfm';
import parsers from '../store/parsers';

// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------

export const FETCH_WEEKLY_CHART_LIST_REQUEST = 'lastfm/FETCH_WEEKLY_CHART_LIST_REQUEST';
export const FETCH_WEEKLY_CHART_LIST_SUCCESS = 'lastfm/FETCH_WEEKLY_CHART_LIST_SUCCESS';
export const FETCH_WEEKLY_CHART_LIST_FAILURE = 'lastfm/FETCH_WEEKLY_CHART_LIST_FAILURE';

export const FETCH_CHARTS_FOR_WEEK_REQUEST = 'lastfm/FETCH_CHARTS_FOR_WEEK_REQUEST';
export const FETCH_CHARTS_FOR_WEEK_SUCCESS = 'lastfm/FETCH_CHARTS_FOR_WEEK_SUCCESS';
export const FETCH_CHARTS_FOR_WEEK_FAILURE = 'lastfm/FETCH_CHARTS_FOR_WEEK_FAILURE';

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
  const payload = parsers.lastfm.parseCharts(response);

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

// Fetch a user's top artists and top tracks for a given chart week

function fetchChartsForWeekRequest() {
  return {
    type: FETCH_CHARTS_FOR_WEEK_REQUEST,
  };
}

function fetchChartsForWeekFailed(err) {
  return {
    type: FETCH_CHARTS_FOR_WEEK_FAILURE,
    error: true,
    payload: err.message,
  };
}

function fetchChartsForWeekSucceeded(response) {
  return {
    type: FETCH_CHARTS_FOR_WEEK_SUCCESS,
    payload: response,
  };
}

export function fetchChartsForWeek(from = null, to = null) {
  return (dispatch, getState) => {
    dispatch(fetchChartsForWeekRequest());

    const user = getState().lastfm.get('username');
    const options = { user, from, to };

    const getTracks = lastfm.user.getWeeklyTrackChart(options);
    const getArtists = lastfm.user.getWeeklyArtistChart(options);

    return Promise.all([getTracks, getArtists]).then(([tracksResponse, artistsResponse]) => {
      dispatch(fetchChartsForWeekSucceeded({
        artists: artistsResponse,
        tracks: tracksResponse,
      }));
    }).catch((err) => {
      dispatch(fetchChartsForWeekFailed(err));
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
