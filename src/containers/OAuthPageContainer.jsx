import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isLoggedIn } from '../store/selectors';
import { login as loginWithSpotify } from '../actions/spotify';
import { login as loginWithLastFM } from '../actions/lastfm';
import OAuthPage from '../components/OAuthPage';

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state),
  isLoggedInSpotify: state.spotify.get('isLoggedIn'),
  isLoggedInLastFm: state.lastfm.get('isLoggedIn'),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ loginWithSpotify, loginWithLastFM }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OAuthPage);
