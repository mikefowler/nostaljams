import { connect } from 'preact-redux';
import App from '../components/App';

import { isLoggedIn } from '../store/selectors';

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state),
  isBootstrapped: state.app.get('isBootstrapped'),
});

export default connect(mapStateToProps)(App);
