import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginPage from '../components/LoginPage';

const mapStateToProps = state => ({
  isLoggedIn: state.spotify.get('isLoggedIn') && state.lastfm.get('isLoggedIn'),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
