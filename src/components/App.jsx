import React, { Component, PropTypes } from 'react';
import qs from 'qs';

import { css, withStyles, withStylesPropTypes } from '../utils/withStyles';
import removeLocationHash from '../utils/removeLocationHash';
import UpdateUsernameContainer from '../containers/UpdateUsernameContainer';
import LoginButtonContainer from '../containers/LoginButtonContainer';
import SpotifyUserCardContainer from '../containers/SpotifyUserCardContainer';
import ChartListContainer from '../containers/ChartListContainer';

const propTypes = {
  ...withStylesPropTypes,
  username: PropTypes.string,
  isBootstrapped: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  setAccessToken: PropTypes.func,
};

const defaultProps = {
  tracks: {},
  isBootstrapped: false,
  isLoggedIn: false,
};

class App extends Component {

  constructor(props) {
    super(props);
    this.setAccessTokenIfNecessary = this.setAccessTokenIfNecessary.bind(this);
  }

  componentWillUpdate(prevProps) {
    // If the app has just booted up, check if we've just finished
    // authenticating with Spotify
    if (prevProps.isBootstrapped !== this.props.isBootstrapped) {
      this.setAccessTokenIfNecessary();
    }
  }

  // After a successful authentication with Spotify, we pull the provided access token from
  // the URL and set it in the Redux store
  setAccessTokenIfNecessary() {
    const hash = window.location.hash.substring(1);
    const options = hash && qs.parse(hash);

    if (options && options.access_token) {
      this.props.setAccessToken(options.access_token);
      removeLocationHash();
    }
  }

  render() {
    const { isBootstrapped, isLoggedIn, styles } = this.props;

    if (!isBootstrapped) return null;

    return (
      <div {...css(styles.container)}>
        {isLoggedIn && (
          <div>
            <SpotifyUserCardContainer />
            <UpdateUsernameContainer />
            <ChartListContainer />
          </div>
        )}

        {!isLoggedIn && (
          <div>
            <LoginButtonContainer />
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default withStyles(() => ({
  container: {

  },
}))(App);
