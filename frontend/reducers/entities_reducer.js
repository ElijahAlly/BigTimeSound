import { combineReducers } from 'redux';
import userReducer from './user_reducer';

const entities = combineReducers({
	user: userReducer,
});

export default entities;
