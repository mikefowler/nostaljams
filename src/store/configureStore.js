/* eslint-disable no-underscore-dangle */

import { compose, createStore, applyMiddleware } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import createLogger from 'redux-logger';
import localForage from 'localforage';
import immutableTransform from 'redux-persist-transform-immutable';

import reducers from '../reducers';
import { User, Chart } from '../store/models';

const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [promiseMiddleware, thunkMiddleware, reduxPackMiddleware, loggerMiddleware];

export default function configureStore(initialState, persistCallback) {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      autoRehydrate(),
      applyMiddleware(...middleware),
    ),
  );

  // Set up persistance of said store
  persistStore(store, {
    storage: localForage,
    transforms: [
      immutableTransform({
        records: [User, Chart],
      }),
    ],
  }, persistCallback);

  if (process.env.NODE_ENV === 'development') {
    window.store = store;
  }

  return store;
}
