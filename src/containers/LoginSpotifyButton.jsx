import { h } from 'preact';
import { connect } from 'preact-redux';

import Button from '../components/Button';
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '../utils/constants';
import authenticateWithSpotify from '../utils/authenticateWithSpotify';

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

function LoginSpotifyButton({ name, isLoggedIn, onPress }) {
  if (isLoggedIn) {
    return (
      <div>
        <p>Logged in to Spotify as {name}.</p>
      </div>
    );
  }

  return (
    <Button onClick={onPress}>
      Log in to Spotify
    </Button>
  );
}

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginSpotifyButton);
