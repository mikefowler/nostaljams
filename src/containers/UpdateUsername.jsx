import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/lastfm';
import { css, withStyles } from '../utils/themes/withStyles';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  updateUsername: PropTypes.func,
  resetUsername: PropTypes.func,
  styles: PropTypes.object.isRequired,
  username: PropTypes.string,
};

const defaultProps = {
  resetUsername() {},
  updateUsername() {},
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

class UpdateUsername extends Component {

  constructor(props) {
    super(props);

    this.state = {
      input: props.username,
    };
  }

  render() {
    const { input } = this.state;
    const { updateUsername, resetUsername, username, styles } = this.props;

    const onSubmit = (e) => {
      if (e) e.preventDefault();
      updateUsername(input);
    };

    return (
      <div {...css(styles.container)}>

        {username && (
          <div>
            <p>Your Last.FM username is <b>{username}</b>.</p>
            <button onClick={resetUsername}>Change</button>
          </div>
        )}

        {!username && (
          <form onSubmit={onSubmit}>
            <label htmlFor="username">
              Username
            </label>
            <input
              id="username"
              placeholder="Username"
              onChange={e => this.setState({ input: e.target.value })}
              value={input}
            />
            <button
              disabled={!input}
              type="submit"
            >
              Update
            </button>
          </form>
        )}

      </div>
    );
  }

}

UpdateUsername.propTypes = propTypes;
UpdateUsername.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

export const UpdateUserNameWithStyles = withStyles(() => ({
  container: {

  },
}))(UpdateUsername);

// ----------------------------------------------------------------------------
// Store connection
// ----------------------------------------------------------------------------

const mapStateToProps = state => ({
  username: state.lastfm.get('username'),
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateUsername: actions.updateUsername,
    resetUsername: actions.resetUsername,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserNameWithStyles);
