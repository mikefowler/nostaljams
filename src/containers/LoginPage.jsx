import { h, Component } from 'preact';
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

import Page from '../components/Page';
import PageContent from '../components/PageContent';
import Title from '../components/Title';
import Spacing from '../components/Spacing';

import LoginButtonLastFm from './LoginButtonLastFm';
import LoginButtonSpotify from './LoginButtonSpotify';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({
  isLoggedIn: state.lastfm.get('isLoggedIn'),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({ }, dispatch)
);

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

class LoginPage extends Component {

  componentWillMount() {
    const { isLoggedIn: shouldRedirect } = this.props;

    if (shouldRedirect) {
      setTimeout(() => {
        route('/charts', true);
      }, 0);
    }
  }

  render() {
    const { isLoggedIn: shouldRedirect } = this.props;

    if (shouldRedirect) return null;

    return (
      <Page>
        <PageContent>
          <Spacing horizontal={2} top={4}>
            <Title contrast>Login</Title>
            <Spacing top={4} bottom={4}>
              <LoginButtonLastFm />
            </Spacing>
            <Spacing>
              <LoginButtonSpotify />
            </Spacing>
          </Spacing>
        </PageContent>
      </Page>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
