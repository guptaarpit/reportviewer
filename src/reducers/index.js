import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import communicationReducer from './communication_reducer';
import cuReducer from './cureducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  communication: communicationReducer,
  cu: cuReducer,
});

export default rootReducer;
