import { h } from 'preact';

import { css, withStyles } from '../utils/themes/withStyles';

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

// ----------------------------------------------------------------------------
// Stylesheet
// ----------------------------------------------------------------------------

export default withStyles(() => ({
  container: {

  },
}))(App);
