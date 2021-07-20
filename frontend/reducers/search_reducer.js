import {
	SEND_SEARCH,
	CLEAR_SEARCH,
	SEND_SEARCH_RESULTS,
} from '../actions/search_actions';

const _initialState = {
	input: '',
	results: {
		albums: [],
		songs: [],
		artists: [],
		playlists: [],
	},
};

const playlistReducer = (state = _initialState, action) => {
	Object.freeze(state);
	const newState = Object.assign({}, state);

	switch (action.type) {
		case SEND_SEARCH_RESULTS:
			newState.results.albums = action.results.data.albums;
			newState.results.artists = action.results.data.artists;
			newState.results.songs = action.results.data.songs;
			newState.results.playlists = action.results.data.playlists;
			return newState;

		case SEND_SEARCH:
			newState.input = action.input;
			return newState;

		case CLEAR_SEARCH:
			newState.input = '';
			return newState;

		default:
			return state;
	}
};

export default playlistReducer;
