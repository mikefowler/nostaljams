import { REHYDRATE } from 'redux-persist/constants';
import { SELECTED_DATE_RANGE } from '../actions/app';
import { LOGOUT_SUCCEEDED } from '../actions/spotify';

const initialState = {
  isBootstrapped: false,
  selectedStartDate: null,
  selectedEndDate: null,
};

export default function reducer(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case REHYDRATE:
      return {
        ...state,
        isBootstrapped: true,
      };
    case LOGOUT_SUCCEEDED:
      return {
        ...state,
        selectedStartDate: null,
        selectedEndDate: null,
      };
    case SELECTED_DATE_RANGE:
      return {
        ...state,
        selectedStartDate: payload.start,
        selectedEndDate: payload.end,
      };
    default:
      return state;
  }
}
