import React, { PropTypes } from 'react';
import { routerShape } from 'react-router';

import LoginLastFMButton from '../containers/LoginLastFMButton';
import LoginSpotifyButton from '../containers/LoginSpotifyButton';

const propTypes = {
  isLoggedIn: PropTypes.bool,
  router: routerShape,
};

export default function LoginPage() {
  return (
    <div>
      <LoginSpotifyButton />
      <LoginLastFMButton />
    </div>
  );
}

LoginPage.propTypes = propTypes;
