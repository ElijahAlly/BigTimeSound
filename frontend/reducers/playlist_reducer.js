import {
	RECEIVE_PLAYLIST,
	DELETE_PLAYLIST,
	LOGOUT_CURRENT_USER,
} from '../actions/playlist_actions';

const playlistReducer = (state = {}, action) => {
	Object.freeze(state);
	const newState = Object.assign({}, state);

	switch (action.type) {
		case RECEIVE_PLAYLIST:
			return action.playlist;
		case DELETE_PLAYLIST:
			delete newState[action.playlistId];
			return newState;
		case LOGOUT_CURRENT_USER:
			return {};
		default:
			return state;
	}
};

export default playlistReducer;
