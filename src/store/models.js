import { Record, List, OrderedMap } from 'immutable';
import moment from 'moment';

// ----------------------------------------------------------------------------
// LastFM Charts
// ----------------------------------------------------------------------------

const ChartRecord = new Record({
  id: undefined,
  start: undefined,
  end: undefined,
}, 'Chart');

export class Chart extends ChartRecord {

  getStartDate() {
    return moment(this.get('start') * 1000, 'x');
  }

  getEndDate() {
    return moment(this.get('end') * 1000, 'x');
  }

}

export const ChartMap = OrderedMap;

// ----------------------------------------------------------------------------
// LastFM Artists
// ----------------------------------------------------------------------------

const ArtistRecord = new Record({
  id: undefined,
  name: undefined,
  playCount: undefined,
  url: undefined,
});

export class Artist extends ArtistRecord {

}

export const ArtistMap = OrderedMap;

// ----------------------------------------------------------------------------
// LastFM Tracks
// ----------------------------------------------------------------------------

const TrackRecord = new Record({
  id: undefined,
  name: undefined,
  artist: undefined,
  playCount: undefined,
  image: undefined,
  url: undefined,
});

export class Track extends TrackRecord {

}

export const TrackMap = OrderedMap;

// ----------------------------------------------------------------------------
// Spotify User
// ----------------------------------------------------------------------------

const UserRecord = new Record({
  id: undefined,
  name: '',
  images: new List(),
  url: '',
}, 'User');

export class User extends UserRecord {

  getImage() {
    return this.get('images').first().get('url');
  }

}

// ----------------------------------------------------------------------------
// Spotify Artist
// ----------------------------------------------------------------------------

const SpotifyArtistRecord = new Record({
  id: undefined,
  name: undefined,
  href: undefined,
  uri: undefined,
});

export class SpotifyArtist extends SpotifyArtistRecord {

}

// ----------------------------------------------------------------------------
// Spotify Track
// ----------------------------------------------------------------------------

const SpotifyTrackRecord = new Record({
  id: undefined,
  name: undefined,
  href: undefined,
  previewUrl: undefined,
  uri: undefined,
  artist: undefined,
  lastfmId: undefined,
});

export class SpotifyTrack extends SpotifyTrackRecord {

}
