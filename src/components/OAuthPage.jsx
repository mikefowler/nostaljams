import { h, Component } from 'preact';
import { route } from 'preact-router';
import qs from 'qs';

import Page from '../components/Page';
import Centered from '../components/Centered';
import Loader from '../components/Loader';
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

    if (!accessToken && !token) {
      route('/login');
      return;
    }

    switch (service) {
      case 'spotify':
        Spotify.setAccessToken(accessToken);
        this.props.loginWithSpotify({ accessToken });
        break;
      case 'lastfm':
        this.props.loginWithLastFM({ token });
        break;
      default:
        route('/login', true);
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
    return (
      <Page>
        <Centered vertical horizontal>
          <Loader />
        </Centered>
      </Page>
    );
  }

}

export default OAuthPage;
