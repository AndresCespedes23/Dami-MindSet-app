import { combineReducers } from 'redux';
import adminsReducer from '../Admins/reducer';
import clientsReducer from '../Clients/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  clients: clientsReducer
});

export default rootReducer;
