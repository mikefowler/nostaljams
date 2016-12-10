import { normalize } from 'normalizr';

import Schemas from '../store/schemas';
import lastfm from '../utils/lastfm';

export const FETCH_WEEKLY_TRACKS_REQUESTED = 'lastfm/FETCH_WEEKLY_TRACKS_REQUESTED';
export const FETCH_WEEKLY_TRACKS_SUCCEEDED = 'lastfm/FETCH_WEEKLY_TRACKS_SUCCEEDED';
export const FETCH_WEEKLY_FAILED = 'lastfm/FETCH_WEEKLY_FAILED';
export const USERNAME_UPDATED = 'lastfm/USERNAME_UPDATED';

function fetchWeeklyTrackChartRequest() {
  return {
    type: FETCH_WEEKLY_TRACKS_REQUESTED,
  };
}

function fetchWeeklyTrackChartFailed(err) {
  return {
    type: FETCH_WEEKLY_FAILED,
    error: true,
    payload: err.message,
  };
}

function fetchWeeklyTrackChartSucceeded(response) {
  return {
    type: FETCH_WEEKLY_TRACKS_SUCCEEDED,
    payload: response,
  };
}

export function fetchWeeklyTrackChart(startDate = null, endDate = null) {
  return (dispatch, getState) => {
    dispatch(fetchWeeklyTrackChartRequest());

    const { username } = getState().lastfm;

    return lastfm
      .get('user.getweeklytrackchart', {
        user: username,
        from: startDate,
        to: endDate,
      })
      .then((response) => {
        let tracks = [];

        if (response.weeklytrackchart) {
          tracks = response.weeklytrackchart.track;
        }

        const data = normalize(tracks, Schemas.TRACK_ARRAY);

        dispatch(fetchWeeklyTrackChartSucceeded(data));
      })
      .catch((err) => {
        dispatch(fetchWeeklyTrackChartFailed(err));
      });
  };
}

export function setUsername(username = null) {
  return {
    type: USERNAME_UPDATED,
    payload: username,
  };
}
