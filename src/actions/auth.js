export const LOGIN_REQUESTED = 'auth/LOGIN_REQUESTED';
export const LOGIN_SUCCEEDED = 'auth/LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'auth/LOGIN_FAILED';

export function loginWithSpotify() {
  return {
    type: LOGIN_REQUESTED,
  };
}

export function setAccessToken(payload) {
  return {
    type: LOGIN_SUCCEEDED,
    payload,
  };
}
