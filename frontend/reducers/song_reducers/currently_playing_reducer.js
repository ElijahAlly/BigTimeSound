import {
	PAUSE_SONG,
	PLAY_SONG,
	CURRENT_TIME,
	SEND_VOLUME,
	SEND_CURRENT_PROGRESS,
	SHUFFLE_ON,
	SHUFFLE_OFF,
	TOGGLE_POPOUT,
	SEND_POPOUT_POS,
	TOGGLE_REPEAT_SONG
} from '../../actions/song/currently_playing';

import {
	COLLAPSE_ALBUM_COVER,
	EXPAND_ALBUM_COVER,
} from '../../actions/album_actions';

import { formatTime } from '../../util/general_functions/format_time';

const _InitialState = {
	song: null,
	isPlaying: false,
	audio: null,
	albumIsCollapsed: false,
	currentTime: 0,
	playingFrom: null,
	volume: 0.5,
	duration: null,
	currentProgress: 0,
	shuffleIsOn: false,
	popoutShowing: false,
	popoutPosition: {left: 100, top: 100},
	repeatSongOn: false
};

const currentlyPlayingReducer = (state = _InitialState, action) => {
	Object.freeze(state);
	const newState = Object.assign({}, state);

	switch (action.type) {
		case PLAY_SONG:
			if (state.audio && state.audio.controls && state.song === action.song) {
				newState.audio = state.audio;
			} else {
				const newAudio = new Audio(action.song.url);
				newAudio.controls = true;
				newAudio.preload = 'metadata';
				newState.audio = newAudio;

				const playbackBarDuration =
					document.getElementsByClassName('progress-time')[1];

				newState.audio.addEventListener('loadeddata', (e) => {
					const duration = formatTime(e.path[0].duration);
					playbackBarDuration.innerHTML = duration;
				});
			}

			newState.audio.currentTime = 0;
			newState.currentTime = 0;
			if (action.song && state.song && state.song.id === action.song.id && action.currentTime) {
				console.log('currentTime:', newState.currentTime);
				newState.audio.currentTime = action.currentTime;
				newState.currentTime = action.currentTime;
			}

			newState.song = action.song;
			newState.audio.volume = action.volume;
			newState.audio.loop = newState.repeatSongOn;
			newState.volume = action.volume;

			newState.duration = action.duration;
			newState.playingFrom = action.playingFrom;
			
			newState.isPlaying = true;
			newState.audio.play();
			return newState;

		case PAUSE_SONG:
			if (action.noAudio) {
				const newAudio = new Audio(state.song.url);
				newAudio.controls = true;
				newAudio.preload = 'metadata';
				newState.audio = newAudio;
			} else {
				state.audio.controls ? state.audio.pause() : null;
				newState.audio = state.audio;
			}

			newState.currentTime = newState.audio.currentTime;
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
			return newState;

		case SEND_VOLUME:
			newState.volume = action.volume;
			return newState;

		case SEND_CURRENT_PROGRESS:
			newState.currentProgress = action.currentProgress;
			return newState;

		case SHUFFLE_ON:
			newState.shuffleIsOn = true;
			return newState;

		case SHUFFLE_OFF:
			newState.shuffleIsOn = false;
			return newState;

		case TOGGLE_POPOUT:
			newState.popoutShowing = action.popoutShowing;
			return newState;

		case SEND_POPOUT_POS:
			newState.popoutPosition = action.popoutPosition;
			return newState;

		case TOGGLE_REPEAT_SONG:
			newState.audio.loop = action.repeatSongOn;
			newState.repeatSongOn = action.repeatSongOn;
			return newState;

		default:
			return state;
	}
};

export default currentlyPlayingReducer;
