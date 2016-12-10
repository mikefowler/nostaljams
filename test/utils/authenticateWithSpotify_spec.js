import { expect } from 'chai';
import wrap from 'mocha-wrap';
import qs from 'qs';

const authenticateWithSpotify = __helper.requireDefault('utils/authenticateWithSpotify');
const { SPOTIFY_OAUTH_URL } = __helper.requireNamed('utils/constants', 'SPOTIFY_OAUTH_URL');

const mockWindow = {
  location: '',
  document: {},
  history: {
    pushState() {},
  },
};

wrap()
  .withWindow(() => mockWindow)
  .describe('authenticateWithSpotify', () => {
    it('redirects the browser to Spotify\' OAuth URL with query parameters set', () => {
      const options = { test: 'test' };
      authenticateWithSpotify(options);

      expect(window.location).to.equal(`${SPOTIFY_OAUTH_URL}?${qs.stringify(options)}`);
    });
  });
