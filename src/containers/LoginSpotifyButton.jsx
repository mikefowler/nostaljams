import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '../utils/constants';
import authenticateWithSpotify from '../utils/authenticateWithSpotify';
import { css, withStyles } from '../utils/themes/withStyles';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  isLoggedIn: PropTypes.bool,
  name: PropTypes.string,
  onPress: PropTypes.func,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  isLoggedIn: false,
  onPress: () => {},
};

const mapStateToProps = state => ({
  isLoggedIn: state.spotify.get('isLoggedIn'),
  name: state.spotify.getIn(['user', 'name']),
});

const mapDispatchToProps = () => ({
  onPress() {
    authenticateWithSpotify({
      client_id: SPOTIFY_CLIENT_ID,
      response_type: 'token',
      redirect_uri: SPOTIFY_REDIRECT_URI,
    });
  },
});

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function LoginSpotifyButton({ name, isLoggedIn, onPress, styles }) {
  if (isLoggedIn) {
    return (
      <div>
        <p>Logged in to Spotify as {name}.</p>
      </div>
    );
  }

  return (
    <button
      {...css(styles.link)}
      onClick={onPress}
    >
      Log in to Spotify
    </button>
  );
}

LoginSpotifyButton.propTypes = propTypes;
LoginSpotifyButton.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

export const LoginSpotifyButtonWithStyles = withStyles(() => ({
  link: {

  },
}))(LoginSpotifyButton);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginSpotifyButtonWithStyles);
