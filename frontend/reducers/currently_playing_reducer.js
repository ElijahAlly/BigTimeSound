import { PAUSE_SONG, PLAY_SONG, CURRENT_TIME } from '../actions/currently_playing';
import {
	COLLAPSE_ALBUM_COVER,
	EXPAND_ALBUM_COVER,
} from '../actions/album_actions';

const _InitialState = {
	song: null,
	isPlaying: false,
	audio: null,
	albumIsCollapsed: false,
	currentTime: 0,
	playingFrom: null,
};

const currentlyPlayingReducer = (state = _InitialState, action) => {
	Object.freeze(state);
	const newState = Object.assign({}, state);

	switch (action.type) {
		case PLAY_SONG:
			if (state.song.id !== action.song.id) {
				console.log('is playing going to pause',state.audio.currentTime)
				state.audio.currentTime = 0;
				console.log('is playing going to pause',state.audio.currentTime)
			}

			if (state.audio.controls) { // true or undefined
				newState.audio = state.audio;
			} else {
				const newAudio = new Audio(action.song.url)
				newState.audio = newAudio;
			}

			newState.song = action.song;
			newState.audio.play();
			newState.playingFrom = action.playingFrom;
			newState.isPlaying = true;
			return newState;

		case PAUSE_SONG:
			console.log(state)
			console.log(action)
			if (state.audio.controls) { // true or undefined
				state.audio.pause();
				newState.audio = state.audio;
			} else {
				const newAudio = new Audio(state.song.url)
				newState.audio = newAudio;
			}
			
			newState.currentTime = newState.audio.currentTime;
			newState.audio.pause();
			newState.isPlaying = false;
			return newState;

		case COLLAPSE_ALBUM_COVER:
			newState.albumIsCollapsed = true;
			return newState;
			
		case EXPAND_ALBUM_COVER:
			newState.albumIsCollapsed = false;
			return newState;
		
		case CURRENT_TIME:
			newState.currentTime = action.currentTime;
			return newState

		default:
			return state;
	}
};

export default currentlyPlayingReducer;
