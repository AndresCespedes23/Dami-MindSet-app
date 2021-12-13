import { combineReducers } from 'redux';
import adminsReducer from '../Admins/reducer';
import psychologistReducer from '../Psychologists/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  psychologists: psychologistReducer
});

export default rootReducer;
