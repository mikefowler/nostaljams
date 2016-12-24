import 'es5-shim';
import 'isomorphic-fetch';
import promise from 'es6-promise';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import Root from './containers/Root';

// Initialize the Promise polyfill
promise.polyfill();

// Initialize the Redux store
const store = configureStore();

// Initial render pass of the app into the DOM
render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('app'),
);

// Set up hot module reloading
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const Component = require('./containers/Root').default;

    render(
      <AppContainer>
        <Component store={store} />
      </AppContainer>,
      document.getElementById('app'),
    );
  });
}
