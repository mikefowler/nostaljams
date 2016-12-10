import { arrayOf, Schema } from 'normalizr';

const track = new Schema('track', { idAttribute: 'url' });
const artist = new Schema('artist', { idAttribute: '#text' });

track.define({
  artist,
});

export default {
  TRACK: track,
  TRACK_ARRAY: arrayOf(track),
};
