import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { css, withStyles } from '../utils/withStyles';
import LogoutButtonContainer from '../containers/LogoutButtonContainer';

const propTypes = {
  styles: PropTypes.object.isRequired,
  user: ImmutablePropTypes.record,
};

const defaultProps = {

};

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

export default withStyles(({ color, unit }) => ({
  container: {
    border: '1px solid lightgrey',
    padding: unit,
  },
}))(SpotifyUserCard);
