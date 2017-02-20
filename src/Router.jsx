import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router as ReactRouter, Route, hashHistory } from 'react-router';

import AppContainer from './containers/AppContainer';
import HomePage from './components/HomePage';
import ChartPageContainer from './containers/ChartPageContainer';
import LoginPageContainer from './containers/LoginPageContainer';
import OAuthPageContainer from './containers/OAuthPageContainer';
import CreatePlaylistPageContainer from './containers/CreatePlaylistPageContainer';
import ViewPlaylistPageContainer from './containers/ViewPlaylistPageContainer';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  isLoggedIn: PropTypes.bool,
  isBootstrapped: PropTypes.bool,
};

const defaultProps = {
  isBootstrapped: false,
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isBootstrapped: state.app.get('isBootstrapped'),
  isLoggedIn: state.lastfm.get('isLoggedIn') && state.spotify.get('isLoggedIn'),
});

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function Router({ isBootstrapped, isLoggedIn }) {
  if (!isBootstrapped) return null;

  const requireAuth = (nextState, replace) => {
    if (!isLoggedIn) {
      replace({
        pathname: '/login',
      });
    }
  };

  return (
    <ReactRouter history={hashHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={HomePage} onEnter={requireAuth} />
        <Router path="/chart" component={ChartPageContainer} onEnter={requireAuth} />
        <Router path="/playlist" component={CreatePlaylistPageContainer} onEnter={requireAuth} />
        <Router path="/playlist/:id" component={ViewPlaylistPageContainer} onEnter={requireAuth} />
        <Router path="/login" component={LoginPageContainer} />
        <Route path="/auth/:service" component={OAuthPageContainer} />
      </Route>
    </ReactRouter>
  );
}

Router.propTypes = propTypes;
Router.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

export default connect(mapStateToProps)(Router);
