import spotify from '../utils/spotify';

export const LOGIN = 'spotify/LOGIN';
export const LOGOUT = 'spotify/LOGOUT';
export const LOOKUP_TRACK = 'spotify/LOOKUP_TRACK';
export const LOOKUP_TRACKS = 'spotify/LOOKUP_TRACKS';

// Authentication

export function login(meta) {
  return {
    type: LOGIN,
    promise: spotify.getMe(),
    meta,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

// Search for track(s) and return matches

export function lookupTrack({ track, artist }) {
  return {
    type: LOOKUP_TRACK,
    promise: spotify.searchTracks(`track:${track} artist:${artist}`),
  };
}

export function lookupTracks(tracks) {
  const promise = Promise.all(tracks.map(track => (
    spotify.searchTracks(`track:${track.name} artist:${track.artist}`)
  )));

  return {
    type: LOOKUP_TRACKS,
    promise,
  };
}
