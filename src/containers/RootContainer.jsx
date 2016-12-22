import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';

import configureStore from '../store/configureStore';
import AppContainer from './AppContainer';
import User from '../models/User';
import Chart from '../models/Chart';

const store = configureStore();

persistStore(store, {
  transforms: [
    immutableTransform({
      records: [User, Chart],
    }),
  ],
});

export default function Root() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
