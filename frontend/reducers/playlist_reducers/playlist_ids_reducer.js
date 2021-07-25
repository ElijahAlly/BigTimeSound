import {
	PLAYLIST_SONG_IDS,
	LOGOUT_CURRENT_USER,
} from '../../actions/playlist_actions';

const initialState = {
	playlist_inclusions: [],
	playlistIds: [],
}

const playlistIdsReducer = (state = initialState, action) => {
	Object.freeze(state);
	const newState = Object.assign({}, state);
	switch (action.type) {
		case PLAYLIST_SONG_IDS:
			console.log(newState);
			newState.playlistIds = action.playlistIds
			newState.playlist_inclusions = action.playlist_inclusions
			console.log(newState);
			return newState;

		case LOGOUT_CURRENT_USER:
			return initialState;

		default:
			return state;
	}
};

export default playlistIdsReducer;
