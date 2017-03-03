import lastfm from '../utils/lastfm';

export const LOGIN = 'lastfm/LOGIN';
export const LOGOUT = 'lastfm/LOGOUT';
export const FETCH_WEEKLY_CHART_LIST = 'lastfm/FETCH_WEEKLY_CHART_LIST';
export const FETCH_CHARTS_FOR_WEEK = 'lastfm/FETCH_CHARTS_FOR_WEEK';

// Authentication

export function login(options) {
  return {
    type: LOGIN,
    promise: lastfm.auth.getSession(options),
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

// Fetch a LastFM user's list of available weekly charts

export function fetchWeeklyChartList(options) {
  return {
    type: FETCH_WEEKLY_CHART_LIST,
    promise: lastfm.user.getWeeklyChartList(options),
  };
}

// Fetch a user's top artists and top tracks for a given chart week

export function fetchChartsForWeek(options) {
  const promise = new Promise((resolve, reject) => {
    const getTracks = lastfm.user.getWeeklyTrackChart(options);
    const getArtists = lastfm.user.getWeeklyArtistChart(options);

    Promise.all([getTracks, getArtists])
      .then(response => resolve(response))
      .catch(err => reject(err));
  });

  return {
    type: FETCH_CHARTS_FOR_WEEK,
    promise,
  };
}
