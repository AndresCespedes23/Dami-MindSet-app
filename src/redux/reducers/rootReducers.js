import { combineReducers } from 'redux';
import adminsReducer from 'redux/Admins/reducer';
import psychologistReducer from 'redux/Psychologists/reducer';
import clientsReducer from 'redux/Clients/reducer';
import applicationsReducer from 'redux/Applications/reducer';
import sessionsReducer from 'redux/Sessions/reducer';
import positionsReducer from 'redux/Positions/reducer';
import interviewsReducer from 'redux/Interviews/reducer';
import profilesReducer from 'redux/Profiles/reducer';
import postulantsReducer from 'redux/Postulants/reducer';
import postulantsModuleReducer from 'redux/PostulantModule/reducer';
import educationModuleReducer from 'redux/PostulantModule/Education/reducer';
import authReducer from 'redux/Auth/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  applications: applicationsReducer,
  sessions: sessionsReducer,
  positions: positionsReducer,
  clients: clientsReducer,
  interviews: interviewsReducer,
  profiles: profilesReducer,
  postulants: postulantsReducer,
  psychologists: psychologistReducer,
  postulantModule: postulantsModuleReducer,
  education: educationModuleReducer,
  auth: authReducer
});

export default rootReducer;
