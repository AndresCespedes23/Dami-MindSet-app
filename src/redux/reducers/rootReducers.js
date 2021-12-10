import { combineReducers } from 'redux';
import adminsReducer from '../Admins/reducer';
import positionsReducer from '../Positions/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  positions: positionsReducer
});

export default rootReducer;
