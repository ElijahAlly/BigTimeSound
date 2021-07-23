import {
	PLAYLIST_SONG_IDS,
	LOGOUT_CURRENT_USER,
} from '../../actions/playlist_actions';

const playlistIdsReducer = (state = {}, action) => {
	Object.freeze(state);

	switch (action.type) {
		case PLAYLIST_SONG_IDS:
			return action.playlistIds;
		case LOGOUT_CURRENT_USER:
			return {};
		default:
			return state;
	}
};

export default playlistIdsReducer;
