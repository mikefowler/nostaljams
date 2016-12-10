import 'es5-shim';
import 'isomorphic-fetch';
import promise from 'es6-promise';
import React from 'react';
import { render } from 'react-dom';

import Root from './containers/Root';

// Initialize the Promise polyfill
promise.polyfill();

function renderApp() {
  render(
    <Root />,
    document.getElementById('app'),
  );
}

if (module.hot) {
  // Enable the Preact devtools if HMR is enabled
  require('preact/devtools'); // eslint-disable-line global-require

  module.hot.accept();
  module.hot.accept('./containers/Root');
}

renderApp();
