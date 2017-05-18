import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { ThemeProvider } from 'styled-components';

import 'es5-shim';
import 'isomorphic-fetch';
import 'promise-polyfill';

import theme from './styles/theme';
import configureStore from './store/configureStore';

import './styles/global';

// Keep a reference to the application's root node
let root;

// Initialize the Redux store
const store = configureStore();

// Requires the root node of the application, Router, and renders
// it into the DOM.
function init() {
  const Router = require('./Routes').default; // eslint-disable-line global-require

  root = render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider>,
    document.body,
    root,
  );
}

if (module.hot) {
  require('preact/devtools'); // eslint-disable-line global-require
  module.hot.accept('./Routes', () => requestAnimationFrame(init));
}

// Boot the application
init();
