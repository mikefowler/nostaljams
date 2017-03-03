import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { lookupTrack } from '../actions/spotify';
import LookupTrack from '../components/LookupTrack';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ lookupTrack }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LookupTrack);
