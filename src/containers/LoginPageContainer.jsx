import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import LoginPage from '../components/LoginPage';

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
