import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';


const ui = combineReducers({
	modal: modalReducer
});

export default ui;