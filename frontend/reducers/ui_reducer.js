import { combineReducers } from 'redux';
import currentlyPlayingReducer from './currently_playing_reducer';
import modalReducer from './modal_reducer';

const ui = combineReducers({
	modal: modalReducer,
	currentlyPlaying: currentlyPlayingReducer,
});


export default ui;