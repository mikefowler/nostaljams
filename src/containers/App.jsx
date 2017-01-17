import React, { Component, PropTypes } from 'react';
import qs from 'qs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/spotify';
import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';
import removeLocationHash from '../utils/removeLocationHash';
import LoginButton from '../containers/LoginButton';
import SpotifyUserCard from '../containers/SpotifyUserCard';
import SetUsernameAndDate from '../containers/SetUsernameAndDate';
import TrackList from '../containers/TrackList';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

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
            <SpotifyUserCard />
            <SetUsernameAndDate />
            <TrackList />
          </div>
        )}

        {!isLoggedIn && (
          <div>
            <LoginButton />
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

const AppWithStyles = withStyles(() => ({
  container: {

  },
}))(App);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({
  isBootstrapped: state.app.get('isBootstrapped'),
  isLoggedIn: state.spotify.get('isLoggedIn'),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setAccessToken: actions.setAccessToken,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppWithStyles);
