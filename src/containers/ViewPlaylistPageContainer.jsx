import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Template from '../components/Template';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Template);
