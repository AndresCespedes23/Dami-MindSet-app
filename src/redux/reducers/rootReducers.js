import { combineReducers } from 'redux';
import adminsReducer from '../Admins/reducer';
import postulantsReducer from '../Postulants/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  postulants: postulantsReducer
});

export default rootReducer;
