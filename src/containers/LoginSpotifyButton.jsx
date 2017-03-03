import { h } from 'preact';
import { connect } from 'preact-redux';

import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '../utils/constants';
import authenticateWithSpotify from '../utils/authenticateWithSpotify';
import { css, withStyles } from '../utils/themes/withStyles';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

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
        <p {...css(styles.text)}>Logged in to Spotify as {name}.</p>
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

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

export const LoginSpotifyButtonWithStyles = withStyles(() => ({
  link: {

  },

  text: {
    color: 'blue',
  },
}))(LoginSpotifyButton);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginSpotifyButtonWithStyles);
