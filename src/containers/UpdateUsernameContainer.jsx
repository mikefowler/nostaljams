import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateUsername, resetUsername } from '../actions/lastfm';
import UpdateUsername from '../components/UpdateUsername';

const mapStateToProps = state => ({
  username: state.lastfm.username,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ updateUsername, resetUsername }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUsername);
