import { CREATE_CUSTOMER, BILLING_ERROR, FETCH_CUSTOMER, CANCEL_SUBSCRIPTION, CHANGE_SUBSCRIPTION, UPDATE_BILLING } from '../actions/types';

const INITIAL_STATE = { message: '', error: '', customer: {} };

export default function (state = INITIAL_STATE, action) {
  if (action.type === CREATE_CUSTOMER) {
    return { ...state, message: action.payload.message };
  } else if (action.type === FETCH_CUSTOMER) {
    return { ...state, customer: action.payload.customer };
  } else if (action.type === CANCEL_SUBSCRIPTION) {
    return { ...state, message: action.payload.message };
  } else if (action.type === CHANGE_SUBSCRIPTION) {
    return { ...state, message: action.payload.message };
  } else if (action.type === UPDATE_BILLING) {
    return { ...state, message: action.payload.message };
  } else if (action.type === BILLING_ERROR) {
    return { ...state, error: action.payload };
  }

  return state;
}
