import { RECEIVE_ALL_PLAYLIST } from '../actions/playlist_actions';

const allPlaylistReducer = (state = null, action) => {
	Object.freeze(state);

	switch (action.type) {
		case RECEIVE_ALL_PLAYLIST:
			return action.playlists ;
		default:
			return state;
	}
};

export default allPlaylistReducer;
