import 'es5-shim';
import 'isomorphic-fetch';
import promise from 'es6-promise';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { persistStore } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';

import configureStore from './store/configureStore';
import RootContainer from './containers/RootContainer';
import User from './models/User';
import Chart from './models/Chart';

// Initialize the Promise polyfill
promise.polyfill();

// Initialize the Redux store
const store = configureStore();

// Set up persistance of said store
persistStore(store, {
  transforms: [
    immutableTransform({
      records: [User, Chart],
    }),
  ],
});

// Initial render pass of the app into the DOM
render(
  <AppContainer>
    <RootContainer store={store} />
  </AppContainer>,
  document.getElementById('app'),
);

// Set up hot module reloading
if (module.hot) {
  module.hot.accept('./containers/RootContainer', () => {
    render(
      <AppContainer
        // eslint-disable-next-line global-require
        component={require('./containers/RootContainer').default}
        props={{ store }}
      />,
      document.getElementById('app'),
    );
  });
}
