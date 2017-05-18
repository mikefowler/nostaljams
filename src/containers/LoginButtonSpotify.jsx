import { h } from 'preact';
import { connect } from 'preact-redux';

import Button from '../components/Button';

import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '../utils/constants';
import authenticateWithSpotify from '../utils/authenticateWithSpotify';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

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

function LoginSpotifyButton({ onPress }) {
  return (
    <Button
      block
      onClick={onPress}
    >
      Log in to Spotify
    </Button>
  );
}

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

export default connect(
  undefined,
  mapDispatchToProps,
)(LoginSpotifyButton);
