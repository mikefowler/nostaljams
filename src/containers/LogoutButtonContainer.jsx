import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logout } from '../actions/spotify';
import LogoutButton from '../components/LogoutButton';

const mapDispatchToProps = dispatch => (
  bindActionCreators({ logout }, dispatch)
);

export default connect(null, mapDispatchToProps)(LogoutButton);
