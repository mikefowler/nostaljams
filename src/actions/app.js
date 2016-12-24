export const SET_DATE = 'app/SET_DATE';

export function setDate(payload) {
  return {
    type: SET_DATE,
    payload,
  };
}
