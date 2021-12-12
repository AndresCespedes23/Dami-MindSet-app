import { combineReducers } from 'redux';
import adminsReducer from '../Admins/reducer';
import sessionsReducer from '../Sessions/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  sessions: sessionsReducer
});

export default rootReducer;
