import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions/spotify';
import { css, withStyles } from '../utils/themes/withStyles';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  logout: PropTypes.func,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  logout() {},
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function LogoutButton({ logout, styles }) {
  return (
    <button
      {...css(styles.link)}
      onClick={logout}
    >
      Log out of Spotify
    </button>
  );
}

LogoutButton.propTypes = propTypes;
LogoutButton.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

const LogoutButtonWithStyles = withStyles(() => ({
  link: {

  },
}))(LogoutButton);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    logout: actions.logout,
  }, dispatch)
);

export default connect(
  null,
  mapDispatchToProps,
)(LogoutButtonWithStyles);
