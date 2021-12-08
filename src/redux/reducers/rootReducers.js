import { combineReducers } from 'redux';
import adminsReducer from '../Admins/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer
});

export default rootReducer;
