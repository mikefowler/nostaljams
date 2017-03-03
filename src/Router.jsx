import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router as ReactRouter, Route, hashHistory } from 'react-router';

import { isLoggedIn } from './store/selectors';
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
  isLoggedIn: isLoggedIn(state),
});

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

class Router extends React.Component {

  constructor(props) {
    super(props);

    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replace) {
    if (!this.props.isLoggedIn) {
      replace({
        pathname: '/login',
      });
    }
  }

  render() {
    const { isBootstrapped } = this.props;

    if (!isBootstrapped) return null;

    return (
      <ReactRouter history={hashHistory}>
        <Route path="/" component={AppContainer}>

          <IndexRoute
            component={HomePage}
            onEnter={this.requireAuth}
          />

          <Router
            path="/chart"
            component={ChartPageContainer}
            onEnter={this.requireAuth}
          />

          <Router
            path="/playlist"
            component={CreatePlaylistPageContainer}
            onEnter={this.requireAuth}
          />

          <Router
            path="/playlist/:id"
            component={ViewPlaylistPageContainer}
            onEnter={this.requireAuth}
          />

          <Router
            path="/login"
            component={LoginPageContainer}
          />

          <Route
            path="/auth/:service"
            component={OAuthPageContainer}
          />
        </Route>
      </ReactRouter>
    );
  }
}

Router.propTypes = propTypes;
Router.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

export default connect(mapStateToProps)(Router);
