import { combineReducers } from 'redux';
import adminsReducer from '../Admins/reducer';
import sessionsReducer from '../Sessions/reducer';
import positionsReducer from '../Positions/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  sessions: sessionsReducer,
  positions: positionsReducer
});

export default rootReducer;
