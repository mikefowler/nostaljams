import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';
import { SET_DATE } from '../actions/app';
import { LOGOUT } from '../actions/spotify';

const initialState = new Map({
  isBootstrapped: false,
  selectedDate: null,
});

export default function reducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case REHYDRATE: {
      const incomingState = payload.app || {};
      const extraKeys = { isBootstrapped: true };
      return state.merge(incomingState, extraKeys);
    }
    case LOGOUT:
      return state.merge({
        selectedDate: null,
      });
    case SET_DATE:
      return state.set('selectedDate', payload);
    default:
      return state;
  }
}
