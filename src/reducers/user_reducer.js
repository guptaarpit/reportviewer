import { FETCH_USER, ERROR_RESPONSE } from '../actions/types';

const INITIAL_STATE = { profile: {}, message: '', error: '' };

export default function (state = INITIAL_STATE, action) {
  if (action.type === FETCH_USER) {
    return { ...state, profile: action.payload.user };
  } else if (action.type === ERROR_RESPONSE) {
    return { ...state, error: action.payload };
  }

  return state;
}
