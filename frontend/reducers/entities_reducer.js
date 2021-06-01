import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import sessionReducer from './session_reducer';

const entities = combineReducers({
	user: userReducer,
	session: sessionReducer,
});

export default entities;
