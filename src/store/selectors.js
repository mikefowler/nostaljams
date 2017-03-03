import { createSelector } from 'reselect';
import { List } from 'immutable';

import ChartMap from '../models/ChartMap';

export const isLoggedIn = state => state.lastfm.get('isLoggedIn') && state.spotify.get('isLoggedIn');

const getSelectedDate = state => state.app.get('selectedDate');
const getCharts = state => state.lastfm.get('charts');
const getTracks = state => state.lastfm.get('tracks');
const getArtists = state => state.lastfm.get('artists');

export const getChartForDate = createSelector(
  [getSelectedDate, getCharts],
  (date, charts) => {
    if (!date) return null;

    return charts.find(chart => chart.get('start') <= date && chart.get('end') >= date);
  },
);

export const getNearestChartsForDate = createSelector(
  [getSelectedDate, getCharts],
  (date, charts) => {
    if (!date) return null;

    const chartsByProximity = charts.reduce((selectedCharts, chart) => {
      if (chart.get('start') > date) {
        return selectedCharts.set(chart.get('id'), chart.get('start') - date);
      } else if (chart.get('end') < date) {
        return selectedCharts.set(chart.get('id'), date - chart.get('end'));
      }

      return selectedCharts;
    }, new ChartMap());

    const nearestCharts = chartsByProximity.sort();

    return nearestCharts.take(2).map((proximity, id) => charts.get(id));
  },
);

export const getTopTracks = createSelector(
  [getTracks],
  tracks => tracks.sort((a, b) => a.get('playCount') < b.get('playCount')).take(20),
);

export const getTopArtists = createSelector(
  [getArtists],
  artists => artists.sort((a, b) => a.get('playCount') < b.get('playCount')).take(20),
);

export const getPlaylistForChart = createSelector(
  [getTracks, getTopArtists],
  (tracks, topArtists) => {
    let topTracks = new List();

    topArtists.forEach((artist) => {
      const artistName = artist.get('name');
      const tracksByArtist = tracks.filter(t => t.get('artist') === artistName);
      const topTracksForArtist = tracksByArtist.sort((a, b) => a.get('playCount') < b.get('playCount'));
      topTracks = topTracks.push(topTracksForArtist.first());
    });

    return topTracks;
  },
);
