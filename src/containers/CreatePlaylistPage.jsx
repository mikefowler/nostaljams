import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import CreatePlaylistPage from '../components/CreatePlaylistPage';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylistPage);
