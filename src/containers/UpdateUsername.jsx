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
    const { username, updateUsername, styles } = this.props;

    const onBlur = () => {
      if (this.state.input !== username) {
        updateUsername(input);
      }
    };

    return (
      <div>
        <label
          {...css(styles.label)}
          htmlFor="username"
        >
          My Last.FM username is
        </label>
        <input
          {...css(styles.input)}
          id="username"
          placeholder="Username"
          onChange={e => this.setState({ input: e.target.value })}
          onBlur={onBlur}
          value={input}
        />
      </div>
    );
  }

}

UpdateUsername.propTypes = propTypes;
UpdateUsername.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

export const UpdateUserNameWithStyles = withStyles(({ font, unit }) => ({
  container: {

  },
  label: {

  },
  input: {
    appearance: 'none',
    border: 'none',
    borderBottom: '1px solid lightgray',
    marginLeft: unit,
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
