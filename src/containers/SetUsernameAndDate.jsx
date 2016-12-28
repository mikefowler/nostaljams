import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import UpdateUsername from '../containers/UpdateUsername';
import SelectDate from '../containers/SelectDate';
import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  ...withStylesPropTypes,
  username: PropTypes.string.isRequired,
};

const defaultProps = {

};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function SetUsernameAndDate({ styles, username }) {
  return (
    <div {...css(styles.container)}>
      <UpdateUsername />
      {username && <SelectDate />}
    </div>
  );
}

SetUsernameAndDate.propTypes = propTypes;
SetUsernameAndDate.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

const SetUsernameAndDateWithStyles = withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
  },
}))(SetUsernameAndDate);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({
  username: state.lastfm.get('username'),
});

export default connect(mapStateToProps)(SetUsernameAndDateWithStyles);
