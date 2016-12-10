import { connect } from 'react-redux';

import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '../utils/constants';
import authenticateWithSpotify from '../utils/authenticateWithSpotify';
import LoginButton from '../components/LoginButton';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
