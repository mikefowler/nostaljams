import React, { Component, PropTypes } from 'react';

const propTypes = {
  logout: PropTypes.func.isRequired,
};

export default class LogoutPage extends Component {

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <p>You have been logged out.</p>
    );
  }

}

LogoutPage.propTypes = propTypes;
