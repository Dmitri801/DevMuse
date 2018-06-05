import { combineReducers } from 'redux';
import postReducer from './postReducer';
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
});