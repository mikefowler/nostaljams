import { List } from 'immutable';

import { User, SpotifyArtist, SpotifyTrack } from '../models';

export function parseUser(response) {
  return new User({
    id: response.id,
    name: response.display_name,
    url: response.external_urls ? response.external_urls.spotify : '',
    images: new List(response.images),
  });
}

export function parseArtist(response) {
  if (!response) return new SpotifyArtist();

  return new SpotifyArtist({
    name: response.name,
    id: response.id,
  });
}

export function parseTrack(response) {
  return new SpotifyTrack({
    id: response.id,
    name: response.name,
    artist: parseArtist(response.artists && response.artists[0]),
    previewUrl: response.preview_url,
    uri: response.uri,
  });
}
