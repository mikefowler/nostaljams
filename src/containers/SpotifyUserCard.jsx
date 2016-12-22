import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';
import LogoutButtonContainer from '../containers/LogoutButton';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  ...withStylesPropTypes,
  user: ImmutablePropTypes.record,
};

const defaultProps = {

};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function SpotifyUserCard({ styles, user }) {
  return (
    <div {...css(styles.container)}>
      <p><b>{user.get('name')}</b> (<a href={user.get('url')}>View</a>)</p>
      <p><LogoutButtonContainer /></p>
    </div>
  );
}

SpotifyUserCard.propTypes = propTypes;
SpotifyUserCard.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

export const SpotifyUserCardWithStyles = withStyles(({ unit }) => ({
  container: {
    border: '1px solid lightgrey',
    padding: unit,
  },
}))(SpotifyUserCard);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({
  user: state.spotify.user,
});

export default connect(mapStateToProps)(SpotifyUserCardWithStyles);
