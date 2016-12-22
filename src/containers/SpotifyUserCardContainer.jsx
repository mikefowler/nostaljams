import { connect } from 'react-redux';

import SpotifyUserCard from '../components/SpotifyUserCard';

const mapStateToProps = state => ({
  user: state.spotify.user,
});

export default connect(mapStateToProps)(SpotifyUserCard);
