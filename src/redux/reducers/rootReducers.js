import { combineReducers } from 'redux';
import adminsReducer from '../Admins/reducer';
import clientsReducer from '../Clients/reducer';
import applicationsReducer from '../Applications/reducer';
import sessionsReducer from '../Sessions/reducer';
import positionsReducer from '../Positions/reducer';
import postulantsReducer from '../Postulants/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  applications: applicationsReducer,
  sessions: sessionsReducer,
  positions: positionsReducer,
  clients: clientsReducer,
  postulants: postulantsReducer
});

export default rootReducer;
