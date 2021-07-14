import {
	RECEIVE_SONG_QUEUE,
	ADD_SONG_TO_QUEUE,
	ADD_SONG_TO_QUEUE_HISTORY,
} from '../actions/song_queue_actions';

const _InitialState = {
	songQueue: [],
	songQueueHistory: [],
};

const albumReducer = (state = _InitialState, action) => {
	Object.freeze(state);
	const newState = Object.assign({}, state);

	switch (action.type) {
		case RECEIVE_SONG_QUEUE:
			newState.songQueue = action.songs;
			return newState;

		case ADD_SONG_TO_QUEUE:
			newState.songQueue.unshift(action.song);
			return newState;

		case ADD_SONG_TO_QUEUE_HISTORY:
			newState.songQueueHistory.push(action.song);
			return newState;

		default:
			return state;
	}
};

export default albumReducer;
