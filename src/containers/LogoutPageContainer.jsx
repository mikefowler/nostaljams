import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../actions/app';
import LogoutPage from '../components/LogoutPage';

const mapDispatchToProps = dispatch => (
  bindActionCreators({ logout }, dispatch)
);

export default connect(undefined, mapDispatchToProps)(LogoutPage);
