import { Map } from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';
import { SET_DATE_RANGE } from '../actions/app';
import { LOGOUT } from '../actions/spotify';

const initialState = new Map({
  isBootstrapped: false,
  selectedStartDate: null,
  selectedEndDate: null,
});

export default function reducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case REHYDRATE: {
      const incomingState = payload.app;

      if (incomingState) {
        return state.merge(incomingState, { isBootstrapped: true });
      }

      return state;
    }
    case LOGOUT:
      return state.merge({
        selectedStartDate: null,
        selectedEndDate: null,
      });
    case SET_DATE_RANGE:
      return state.merge({
        selectedStartDate: payload.startDate,
        selectedEndDate: payload.endDate,
      });
    default:
      return state;
  }
}
