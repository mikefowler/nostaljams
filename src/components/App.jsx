import React, { PropTypes } from 'react';

import { css, withStyles, withStylesPropTypes } from '../utils/themes/withStyles';

// ----------------------------------------------------------------------------
// Props
// ----------------------------------------------------------------------------

const propTypes = {
  ...withStylesPropTypes,
  isBootstrapped: PropTypes.bool,
};

const defaultProps = {
  isBootstrapped: false,
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

function App({ children, styles }) {
  return (
    <div {...css(styles.container)}>
      {children}
    </div>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

export default withStyles(() => ({
  container: {

  },
}))(App);
