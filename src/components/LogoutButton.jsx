import React, { PropTypes } from 'react';
import { css, withStyles } from '../utils/withStyles';

const propTypes = {
  logout: PropTypes.func,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  logout() {},
};

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

export default withStyles(() => ({
  link: {

  },
}))(LogoutButton);
