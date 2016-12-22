import 'es5-shim';
import 'isomorphic-fetch';
import promise from 'es6-promise';
import React from 'react';
import { render } from 'react-dom';

import RootContainer from './containers/RootContainer';

// Initialize the Promise polyfill
promise.polyfill();

function renderApp() {
  render(
    <RootContainer />,
    document.getElementById('app'),
  );
}

if (module.hot) {
  module.hot.accept();
  module.hot.accept('./containers/RootContainer');
}

renderApp();
