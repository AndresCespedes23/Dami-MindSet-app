import { combineReducers } from 'redux';
import adminsReducer from '../Admins/reducer';
import applicationsReducer from '../Applications/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  applications: applicationsReducer
});

export default rootReducer;
