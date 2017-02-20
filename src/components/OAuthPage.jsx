import React, { PropTypes } from 'react';
import qs from 'qs';
import { routerShape } from 'react-router';

import Spotify from '../utils/spotify';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  router: routerShape,
  loginWithLastFM: PropTypes.func,
  loginWithSpotify: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.shape({
    service: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function OAuthPage(props) {
  const { location, params, router } = props;
  const { service } = params;
  const query = qs.parse(location.search.substring(1));

  const {
    access_token: accessToken,
    token,
  } = query;

  debugger;

  switch (service) {
    case 'spotify':
      Spotify.setAccessToken(accessToken);
      props.loginWithSpotify({ accessToken }).then(() => {
        router.replace('/');
      });
      break;
    case 'lastfm':
      props.loginWithLastFM({ token }).then(() => {
        router.replace('/');
      });
      break;
    default:
      break;
  }

  // @TODO: replace with loading component
  return <p>Logging in.</p>;
}

OAuthPage.propTypes = propTypes;

export default OAuthPage;
