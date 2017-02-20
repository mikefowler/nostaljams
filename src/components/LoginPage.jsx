import React, { Component, PropTypes } from 'react';
import { routerShape } from 'react-router';

import LoginLastFMButton from '../containers/LoginLastFMButton';
import LoginSpotifyButton from '../containers/LoginSpotifyButton';

const propTypes = {
  isLoggedIn: PropTypes.bool,
  router: routerShape,
};

export default class LoginPage extends Component {

  componentDidMount() {
    const { isLoggedIn, router } = this.props;

    if (isLoggedIn) {
      router.replace('/');
    }
  }

  render() {
    return (
      <div>
        <LoginSpotifyButton />
        <LoginLastFMButton />
      </div>
    );
  }
}

LoginPage.propTypes = propTypes;
