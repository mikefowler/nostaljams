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
    id: parseInt(chart.from, 10),
    start: parseInt(chart.from, 10),
    end: parseInt(chart.to, 10),
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
    playCount: parseInt(artist.playcount, 10),
    url: artist.urll,
  });
}

export function parseArtists(artists) {
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
    playCount: parseInt(track.playcount, 10),
    url: track.url,
    image: parseImages(track.image),
  });
}

export function parseTracks(tracks) {
  if (!tracks) return new OrderedMap();

  return new TrackMap(tracks.map((track) => {
    const trackRecord = parseTrack(track);
    return [trackRecord.id, trackRecord];
  }));
}
