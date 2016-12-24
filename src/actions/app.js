export const SET_DATE_RANGE = 'app/SET_DATE_RANGE';
export const SET_START_DATE = 'app/SET_START_DATE';
export const SET_END_DATE = 'app/SET_END_DATE';

export function setDateRange(payload) {
  return {
    type: SET_DATE_RANGE,
    payload,
  };
}
