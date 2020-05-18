import { combineReducers } from 'redux';
import auth from './ducks/auth/auth';
import login from './ducks/login/login';
import drawer from './ducks/drawer/drawer';

const rootReducer = combineReducers({
  auth,
  login,
  drawer,
});

export default rootReducer;
