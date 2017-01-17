import Immutable, { OrderedMap } from 'immutable';
import hash from 'string-hash';

import {
  Chart,
  ChartMap,
  Artist,
  ArtistMap,
  Track,
  TrackMap,
} from '../models';

// ----------------------------------------------------------------------------
// Charts
// ----------------------------------------------------------------------------

export function parseChart(chart) {
  return new Chart({
    id: parseInt(chart.from, 10) * 1000,
    start: parseInt(chart.from, 10) * 1000,
    end: parseInt(chart.to, 10) * 1000,
  });
}

export function parseCharts(response) {
  const { chart: charts } = response;

  if (!charts) return new ChartMap();

  return new ChartMap(charts.map((chart) => {
    const chartRecord = parseChart(chart);
    return [chartRecord.id, chartRecord];
  }));
}

// ----------------------------------------------------------------------------
// Artists
// ----------------------------------------------------------------------------

function parseArtist(artist) {
  return new Artist({
    id: hash(artist.url),
    name: artist.name,
    playCount: artist.playcount,
    url: artist.urll,
  });
}

export function parseArtists(response) {
  const { artist: artists } = response;

  if (!artists) return new OrderedMap();

  return new ArtistMap(artists.map((artist) => {
    const artistRecord = parseArtist(artist);
    return [artistRecord.id, artistRecord];
  }));
}

// ----------------------------------------------------------------------------
// Tracks
// ----------------------------------------------------------------------------

function parseImages(images) {
  const data = images.reduce((accumulator, item) => (
    Object.assign({}, accumulator, {
      [item.size]: item['#text'],
    })
  ), {});

  return Immutable.fromJS(data);
}

function parseTrack(track) {
  return new Track({
    id: hash(track.url),
    name: track.name,
    artist: track.artist['#text'],
    playCount: track.playcount,
    url: track.url,
    image: parseImages(track.image),
  });
}

export function parseTracks(response) {
  const { track: tracks } = response;

  if (!tracks) return new OrderedMap();

  return new TrackMap(tracks.map((track) => {
    const trackRecord = parseTrack(track);
    return [trackRecord.id, trackRecord];
  }));
}
