import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false };

export default function (state = INITIAL_STATE, action) {
  if (action.type === AUTH_USER) {
    return { ...state, error: '', message: '', authenticated: true };
  } else if (action.type === UNAUTH_USER) {
    return { ...state, authenticated: false, error: action.payload };
  } else if (action.type === AUTH_ERROR) {
    return { ...state, error: action.payload };
  } else if (action.type === FORGOT_PASSWORD_REQUEST) {
    return { ...state, message: action.payload.message };
  } else if (action.type === RESET_PASSWORD_REQUEST) {
    return { ...state, message: action.payload.message };
  } else if (action.type === PROTECTED_TEST) {
    return { ...state, content: action.payload.message };
  }

  return state;
}
