import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import ViewPlaylistPage from '../components/ViewPlaylistPage';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ViewPlaylistPage);
