import { createAction } from 'redux-actions';

import spotify from '../utils/spotify';

// Authentication

export const login = createAction('spotify/LOGIN', spotify.getMe, options => options);
export const logout = createAction('spotify/LOGOUT');

// Search for track(s) and return matches

export const lookupTrack = createAction('spotify/LOOKUP_TRACK', async ({ track, artist }) => {
  const result = await spotify.searchTracks(`track:${track} artist:${artist}`);

  return result.tracks;
});

export const lookupTracks = createAction('spotify/LOOKUP_TRACKS', async (tracks) => {
  const results = await Promise.all(tracks.map(track => (
    spotify.searchTracks(`track:${track.name} artist:${track.artist}`)
  )));

  return results;
});
