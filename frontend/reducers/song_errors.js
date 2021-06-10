import {
	RECEIVE_SONG_ERRORS,
	CLEAR_SONG_ERRORS,
} from '../actions/song_actions';

const _nullErrors = [];

const songErrorsReducer = (state = _nullErrors, action) => {
	Object.freeze(state);

	switch (action.type) {
		case RECEIVE_SONG_ERRORS:
			return action.errors;
		case CLEAR_SONG_ERRORS:
			return _nullErrors;
		default:
			return state;
	}
};

export default songErrorsReducer;
