import React, { PropTypes } from 'react';
import { css, withStyles } from '../utils/withStyles';

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

export default withStyles(({ color }) => ({
  link: {

  },
}))(LoginButton);
