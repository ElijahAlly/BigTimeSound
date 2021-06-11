import { combineReducers } from 'redux';
import currentlyPlayingReducer from './currently_playing_reducer';
import modalReducer from './modal_reducer';
import refreshPageReducer from './refresh_page_reducer';

const ui = combineReducers({
	modal: modalReducer,
	currentlyPlaying: currentlyPlayingReducer,
	refresh: refreshPageReducer
});

export default ui;