import { PAUSE_SONG, PLAY_SONG, CURRENT_TIME, SEND_VOLUME } from '../actions/currently_playing';
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
	volume: 0.5,
};

const currentlyPlayingReducer = (state = _InitialState, action) => {
	Object.freeze(state);
	const newState = Object.assign({}, state);

	switch (action.type) {
		case PLAY_SONG:
			if (state.audio && state.audio.controls) { 
				newState.audio = state.audio;
			} else {
				const newAudio = new Audio(action.song.url)
				newAudio.controls = true;
				newState.audio = newAudio;
			}

			if (action.song.id === state.song.id) {
				newState.audio.currentTime = action.currentTime;
			} else {
				newState.audio.currentTime = 0;
			}

			newState.song = action.song;
			newState.playingFrom = action.playingFrom;
			newState.isPlaying = true;
			newState.audio.play();
			console.log('state',state)
			console.log('action',action)
			console.log('new state', newState)
			return newState;

		case PAUSE_SONG:
			newState.currentTime = newState.audio.currentTime;
			state.audio.pause()
			newState.audio = state.audio;
			newState.isPlaying = false;
			console.log('state',state)
			console.log('action',action)
			console.log('new state', newState)
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
		
		case SEND_VOLUME:
			newState.volume = action.volume;
			return newState

		default:
			return state;
	}
};

export default currentlyPlayingReducer;
