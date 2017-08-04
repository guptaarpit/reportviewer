import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import communicationReducer from './communication_reducer';
import cuReducer from './cureducer';
import query from './queryreducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  communication: communicationReducer,
  cu: cuReducer,
  query,
});

export default rootReducer;
