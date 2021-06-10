import { combineReducers } from 'redux';
import currentlyPlayingReducer from './currently_playing_reducer';
import albumReducer from './album_reducer'
import modalReducer from './modal_reducer';

const ui = combineReducers({
	modal: modalReducer,
	currentlyPlaying: currentlyPlayingReducer,
	currentlyPlayingAlbum: albumReducer
});

export default ui;