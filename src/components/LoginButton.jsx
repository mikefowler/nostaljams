import React, { PropTypes } from 'react';

import { css, withStyles } from '../utils/withStyles';
import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from '../utils/constants';
import authenticateWithSpotify from '../utils/authenticateWithSpotify';

const propTypes = {
  onPress: PropTypes.func,
  styles: PropTypes.object.isRequired,
};

const defaultProps = {
  onPress: () => {},
};

function LoginButton({ onPress, styles }) {
  return (
    <button
      {...css(styles.link)}
      onClick={onPress}
    >
      Log in to Spotify
    </button>
  );
}

LoginButton.propTypes = propTypes;
LoginButton.defaultProps = defaultProps;

export default withStyles(() => ({
  link: {

  },
}))(LoginButton);
