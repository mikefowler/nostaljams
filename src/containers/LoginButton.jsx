import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '../utils/constants';
import authenticateWithSpotify from '../utils/authenticateWithSpotify';
import { css, withStyles } from '../utils/themes/withStyles';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  onPress: PropTypes.func,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  onPress: () => {},
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function LoginButton({ onPress, styles }) {
  return (
    <button
      {...css(styles.link)}
      onClick={onPress}
    >
      Log in to Spotify
    </button>
  );
}

LoginButton.propTypes = propTypes;
LoginButton.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

export const LoginButtonWithStyles = withStyles(() => ({
  link: {

  },
}))(LoginButton);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({
  isLoggedIn: state.spotify.isLoggedIn,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginButtonWithStyles);
