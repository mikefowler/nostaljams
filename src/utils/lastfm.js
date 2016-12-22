import qs from 'qs';
import { LASTFM_API_KEY } from './constants';

export const API_URL = 'http://ws.audioscrobbler.com/2.0/';

function request(method = 'GET', endpoint, options) {
  const query = {
    ...options,
    api_key: LASTFM_API_KEY,
    method: endpoint,
    format: 'json',
  };

  const url = `${API_URL}?${qs.stringify(query)}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then((response) => {
        let data = response;

        if (method === 'GET') {
          const key = endpoint.split('.')[1].replace(/^get/, '');
          data = response[key];
        }

        resolve(data);
      })
      .catch(err => reject(err));
  });
}

export default {

  user: {

    getWeeklyChartList(options = {}) {
      return request('GET', 'user.getweeklyalbumchart', options);
    },

    getWeeklyAlbumChart(options = {}) {
      return request('GET', 'user.getweeklyalbumchart', options);
    },

    getWeeklyArtistChart(options = {}) {
      return request('GET', 'user.getweeklyartistchart', options);
    },

    getWeeklyTrackChart(options = {}) {
      return request('GET', 'user.getweeklytrackchart', options);
    },

  },
};
