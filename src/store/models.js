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
    return moment(this.get('start'), 'x');
  }

  getEndDate() {
    return moment(this.get('end'), 'x');
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
