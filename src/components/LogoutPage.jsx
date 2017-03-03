import { h, Component } from 'preact';

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
