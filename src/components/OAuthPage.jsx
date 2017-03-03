import { h, Component } from 'preact';
import { route } from 'preact-router';
import qs from 'qs';

import Spotify from '../utils/spotify';

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

class OAuthPage extends Component {

  componentDidMount() {
    const { service } = this.props;
    const search = window.location.hash.split('?')[1];
    const query = qs.parse(search);

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
    const { isLoggedIn, isLoggedInLastFm, isLoggedInSpotify } = this.props;

    if (
      (isLoggedInLastFm && prevProps.isLoggedInLastFm !== isLoggedInLastFm) ||
      (isLoggedInSpotify && prevProps.isLoggedInSpotify !== isLoggedInSpotify)
    ) {
      if (isLoggedIn) {
        route('/');
      } else {
        route('/login');
      }
    }
  }

  render() {
    // @TODO: replace with loading component
    return <p>Logging in.</p>;
  }

}

export default OAuthPage;
