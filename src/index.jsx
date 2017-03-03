import 'es5-shim';
import 'isomorphic-fetch';
import 'preact/devtools';
import promise from 'es6-promise';
import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import './styles/global.css';
import configureStore from './store/configureStore';
import Router from './Router';

// Initialize the Promise polyfill
promise.polyfill();

// Initialize the Redux store
const store = configureStore();

// Initial render pass of the app into the DOM
render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('app'),
);
