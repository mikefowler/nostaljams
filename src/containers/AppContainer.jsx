import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = state => ({
  isBootstrapped: state.app.get('isBootstrapped'),
});

export default connect(mapStateToProps)(App);
