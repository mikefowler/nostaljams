/* eslint-disable no-underscore-dangle */

import { compose, createStore, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';

const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunkMiddleware, loggerMiddleware];

export default function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeEnhancers(
      autoRehydrate(),
      applyMiddleware(...middleware),
    ),
  );
}
