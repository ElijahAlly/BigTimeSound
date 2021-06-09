import {
	CLEAR_PLAYLIST_ERRORS,
	RECEIVE_PLAYLIST_ERRORS,
} from '../actions/playlist_actions';



const PlaylistErrorsReducer = (state = null, action) => {
	Object.freeze(state);

	switch (action.type) {
		case RECEIVE_PLAYLIST_ERRORS:
			return null;
		case CLEAR_PLAYLIST_ERRORS:
			return null;
		default:
			return state;
	}
};

export default PlaylistErrorsReducer;
