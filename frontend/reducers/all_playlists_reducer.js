import { LOGOUT_CURRENT_USER, RECEIVE_ALL_PLAYLIST } from '../actions/playlist_actions';

const allPlaylistReducer = (state = null, action) => {
	Object.freeze(state);

	switch (action.type) {
		case RECEIVE_ALL_PLAYLIST:
			return action.playlists;
		case LOGOUT_CURRENT_USER:
			return {};
		default:
			return state;
	}
};

export default allPlaylistReducer;
