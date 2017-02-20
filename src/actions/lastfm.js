import { createAction } from 'redux-actions';

import lastfm from '../utils/lastfm';

const LOGIN = 'lastfm/LOGIN';
const LOGOUT = 'lastfm/LOGOUT';
const FETCH_WEEKLY_CHART_LIST = 'lastfm/FETCH_WEEKLY_CHART_LIST';
const FETCH_CHARTS_FOR_WEEK = 'lastfm/FETCH_CHARTS_FOR_WEEK';

// Authentication

export const login = createAction('lastfm/LOGIN', async (options) => {
  const result = await lastfm.auth.getSession(options);
  return result.session;
});

export const logout = createAction('lastfm/LOGOUT');

// Fetch a LastFM user's list of available weekly charts

export const fetchWeeklyChartList = createAction('lastfm/FETCH_WEEKLY_CHART_LIST', async (options) => {
  const result = await lastfm.user.getWeeklyChartList(options);
  return result.weeklychartlist;
});

// Fetch a user's top artists and top tracks for a given chart week

export const fetchChartsForWeek = createAction('lastfm/FETCH_CHARTS_FOR_WEEK', async (options) => {
  const getTracks = lastfm.user.getWeeklyTrackChart(options);
  const getArtists = lastfm.user.getWeeklyArtistChart(options);

  const results = await Promise.all([getTracks, getArtists]);

  const { track: tracks } = results[0].weeklytrackchart;
  const { artist: artists } = results[1].weeklyartistchart;

  return { tracks, artists };
});
