import { LOGOUT_CURRENT_USER, RECEIVE_ALL_PLAYLIST } from '../../actions/playlist_actions';

const allPlaylistReducer = (state = {}, action) => {
	Object.freeze(state);

	switch (action.type) {
		case RECEIVE_ALL_PLAYLIST:
			const newState = {};
			action.playlists.forEach(playlist => {
				newState[playlist.id] = playlist
			});
			return newState;
		case LOGOUT_CURRENT_USER:
			return {};
		default:
			return state;
	}
};

export default allPlaylistReducer;
