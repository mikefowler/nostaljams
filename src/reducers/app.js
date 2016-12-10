import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  isBootstrapped: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        isBootstrapped: true,
      };
    default:
      return state;
  }
}
