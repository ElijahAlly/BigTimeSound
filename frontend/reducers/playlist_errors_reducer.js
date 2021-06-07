import {
	CLEAR_PLAYLIST_ERRORS,
	RECEIVE_PLAYLIST_ERRORS,
} from '../actions/playlist_actions';



const PlaylistErrorsReducer = (state = {}, action) => {
	Object.freeze(state);

	switch (action.type) {
		case RECEIVE_PLAYLIST_ERRORS:
			return action.errors;
		case CLEAR_PLAYLIST_ERRORS:
			return {};
		default:
			return state;
	}
};

export default PlaylistErrorsReducer;
