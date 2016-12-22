import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from '../components/App';
import { setAccessToken } from '../actions/spotify';

const mapStateToProps = state => ({
  isBootstrapped: state.app.isBootstrapped,
  isLoggedIn: state.spotify.isLoggedIn,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ setAccessToken }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
