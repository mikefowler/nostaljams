import { h } from 'preact';
import { connect } from 'preact-redux';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';

import { isLoggedIn } from './store/selectors';
import AuthenticatedRoute from './containers/AuthenticatedRoute';
import App from './components/App';

import HomePage from './containers/HomePage';
import ChartsPage from './containers/ChartsPage';
import ChartPage from './containers/ChartPage';
import LoginPage from './containers/LoginPage';
import OAuthPage from './containers/OAuthPage';
import CreatePlaylistPage from './containers/CreatePlaylistPage';
import ViewPlaylistPage from './containers/ViewPlaylistPage';

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

function Routes({ isBootstrapped }) {
  if (!isBootstrapped) return null;

  return (
    <App>
      <Router history={createHashHistory()}>

        <HomePage path="/" />
        <LoginPage path="/login" />
        <OAuthPage path="/auth/:service" />

        <AuthenticatedRoute
          path="/charts"
          default
          component={ChartsPage}
        />

        <AuthenticatedRoute
          path="/chart/:chartId"
          component={ChartPage}
        />

        <AuthenticatedRoute
          path="/playlist"
          component={CreatePlaylistPage}
          onEnter={this.requireAuth}
        />

        <AuthenticatedRoute
          path="/playlist/:playlistId"
          component={ViewPlaylistPage}
        />

      </Router>
    </App>
  );
}

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

export default connect(mapStateToProps)(Routes);
