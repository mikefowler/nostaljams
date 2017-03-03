import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { Router as PreactRouter } from 'preact-router';
import { createHashHistory } from 'history';

import { isLoggedIn } from './store/selectors';
import AuthenticatedRouteContainer from './containers/AuthenticatedRouteContainer';
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

const mapStateToProps = state => ({
  isBootstrapped: state.app.get('isBootstrapped'),
  isLoggedIn: isLoggedIn(state),
});

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

class Router extends Component {

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
      <AppContainer>
        <PreactRouter history={createHashHistory()}>

          <AuthenticatedRouteContainer
            path="/"
            default
            component={HomePage}
          />

          <LoginPageContainer path="/login" />

          <AuthenticatedRouteContainer
            path="/chart/:chartId"
            component={ChartPageContainer}
          />

          <AuthenticatedRouteContainer
            path="/playlist"
            component={CreatePlaylistPageContainer}
            onEnter={this.requireAuth}
          />

          <AuthenticatedRouteContainer
            path="/playlist/:playlistId"
            component={ViewPlaylistPageContainer}
          />

          <OAuthPageContainer path="/auth/:service" />

        </PreactRouter>
      </AppContainer>
    );
  }
}

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

export default connect(mapStateToProps)(Router);
