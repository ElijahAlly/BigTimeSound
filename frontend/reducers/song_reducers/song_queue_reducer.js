import {
	RECEIVE_SONG_QUEUE,
	ADD_SONG_TO_QUEUE,
	ADD_SONG_TO_QUEUE_HISTORY,
	REMOVE_NEXT_FROM_QUEUE,
	REMOVE_LAST_FROM_QUEUE,
	CLEAR_QUEUE,
	ADD_TO_FRONT_QUEUE,
} from '../../actions/song/song_queue_actions';

const _InitialState = {
	songQueue: [],
	songQueueHistory: [],
};

const songQueueReducer = (state = _InitialState, action) => {
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
			if (
				newState.songQueueHistory.length === 0 ||
				newState.songQueueHistory[newState.songQueueHistory.length - 1].id !==
					action.song.id
			) {
				newState.songQueueHistory.push(action.song);
			}

			return newState;

		case REMOVE_NEXT_FROM_QUEUE:
			newState.songQueue.shift();
			return newState;

		case REMOVE_LAST_FROM_QUEUE:
			newState.songQueueHistory.pop();
			return newState;

		case CLEAR_QUEUE:
			newState.songQueueHistory = [];
			return newState;

		case ADD_TO_FRONT_QUEUE:
			newState.songQueue.unshift(action.song)
			return newState;

		default:
			return state;
	}
};

export default songQueueReducer;
