import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { login as loginWithSpotify } from '../actions/spotify';
import { login as loginWithLastFM } from '../actions/lastfm';
import OAuthPage from '../components/OAuthPage';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ loginWithSpotify, loginWithLastFM }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OAuthPage);
