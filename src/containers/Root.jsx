import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import configureStore from '../store/configureStore';
import App from './App';

const store = configureStore();
persistStore(store);

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
