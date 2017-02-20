import React, { Component, PropTypes } from 'react';
import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';

const propTypes = {
  ...withStylesPropTypes,
};

const defaultProps = {

};

class Template extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { styles } = this.props;

    return (
      <div {...css(styles.container)}>
        Template
      </div>
    );
  }

}

Template.propTypes = propTypes;
Template.defaultProps = defaultProps;

export default withStyles(({ color }) => ({
  container: {
    backgroundColor: color.white,
  },
}))(Template);
