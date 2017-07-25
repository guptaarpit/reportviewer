import { FETCH_CONVERSATIONS, SEND_CONTACT_FORM, SEND_REPLY, START_CONVERSATION, FETCH_SINGLE_CONVERSATION, FETCH_RECIPIENTS, CHAT_ERROR } from '../actions/types';

const INITIAL_STATE = { conversations: [], message: '', messages: [], recipients: [], error: '' };

export default function (state = INITIAL_STATE, action) {
  if (action.type === FETCH_CONVERSATIONS) {
    return { ...state, conversations: action.payload.conversations };
  } else if (action.type === FETCH_SINGLE_CONVERSATION) {
    return { ...state, messages: action.payload.conversation };
  } else if (action.type === FETCH_RECIPIENTS) {
    return { ...state, recipients: action.payload.recipients };
  } else if (action.type === START_CONVERSATION) {
    return { ...state, message: action.payload.message };
  } else if (action.type === SEND_REPLY) {
    return { ...state, message: action.payload.message };
  } else if (action.type === SEND_CONTACT_FORM) {
    return { ...state, message: action.payload.message };
  } else if (action.type === CHAT_ERROR) {
    return { ...state, error: action.payload };
  }

  return state;
}
