import React, { Component, PropTypes } from 'react';
import qs from 'qs';
import { routerShape } from 'react-router';

import Spotify from '../utils/spotify';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  isLoggedIn: PropTypes.bool,
  isLoggedInSpotify: PropTypes.bool,
  isLoggedInLastFm: PropTypes.bool,
  router: routerShape,
  loginWithLastFM: PropTypes.func,
  loginWithSpotify: PropTypes.func,
  location: PropTypes.object,
  params: PropTypes.shape({
    service: PropTypes.string,
  }),
};

const defaultProps = {
  isLoggedIn: false,
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

class OAuthPage extends Component {

  componentDidMount() {
    const { location, params, router } = this.props;
    const { service } = params;
    const query = qs.parse(location.search.substring(1));

    const {
      access_token: accessToken,
      token,
    } = query;

    switch (service) {
      case 'spotify':
        Spotify.setAccessToken(accessToken);
        this.props.loginWithSpotify({ accessToken });
        break;
      case 'lastfm':
        this.props.loginWithLastFM({ token });
        break;
      default:
        break;
    }
  }

  componentDidUpdate(prevProps) {
    const { router, isLoggedIn, isLoggedInLastFm, isLoggedInSpotify } = this.props;

    if (
      (isLoggedInLastFm && prevProps.isLoggedInLastFm !== isLoggedInLastFm) ||
      (isLoggedInSpotify && prevProps.isLoggedInSpotify !== isLoggedInSpotify)
    ) {
      if (isLoggedIn) {
        router.replace('/');
      } else {
        router.replace('/login');
      }
    }
  }

  render() {
    // @TODO: replace with loading component
    return <p>Logging in.</p>;
  }

}

OAuthPage.propTypes = propTypes;
OAuthPage.defaultProps = defaultProps;

export default OAuthPage;
