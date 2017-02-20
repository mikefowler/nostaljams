import 'es5-shim';
import 'isomorphic-fetch';
import promise from 'es6-promise';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import './styles/global.css';
import configureStore from './store/configureStore';
import Router from './Router';

// Initialize the Promise polyfill
promise.polyfill();

// Initialize the Redux store
const store = configureStore();

// Initial render pass of the app into the DOM
render(
  <AppContainer>
    <Provider store={store}>
      <Router />
    </Provider>
  </AppContainer>,
  document.getElementById('app'),
);

// Set up hot module reloading
if (module.hot) {
  module.hot.accept('./Router', () => {
    // eslint-disable-next-line global-require
    const Component = require('./Router').default;

    render(
      <AppContainer>
        <Provider store={store}>
          <Component />
        </Provider>
      </AppContainer>,
      document.getElementById('app'),
    );
  });
}
