import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'preact-redux';

import { isLoggedIn } from '../store/selectors';

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state),
});

class AuthenticatedRoute extends Component {

  componentWillMount() {
    const { isLoggedIn: shouldRenderRoute } = this.props;

    if (!shouldRenderRoute) {
      route('/login');
    }
  }

  render() {
    const {
      component: RouteComponent,
      isLoggedIn: shouldRenderRoute,
      ...props
    } = this.props;

    if (!shouldRenderRoute) return null;

    return (
      <RouteComponent {...props} />
    );
  }

}

export default connect(mapStateToProps)(AuthenticatedRoute);
