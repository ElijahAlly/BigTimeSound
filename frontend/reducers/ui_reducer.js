import { combineReducers } from 'redux';
import currentlyPlayingReducer from './currently_playing_reducer';
import modalReducer from './modal_reducer';
import songQueueReducer from './song_queue_reducer';
import pathReducer from './path_reducer';
import searchReducer from './search_reducer';

const ui = combineReducers({
	modal: modalReducer,
	currentlyPlaying: currentlyPlayingReducer,
	path: pathReducer,
	queue: songQueueReducer,
	search: searchReducer,
});

export default ui;
