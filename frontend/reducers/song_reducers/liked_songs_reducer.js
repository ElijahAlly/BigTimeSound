import {
	RECEIVE_LIKED_SONGS,
} from '../../actions/song/song_actions';

const _noSongs = {
	likes: {},
	songs: {}, 
};

const likedSongsReducer = (state = _noSongs, action) => {
	Object.freeze(state);
	let newState = Object.assign({}, state);

	switch (action.type) {
		case RECEIVE_LIKED_SONGS:
			newState.songs = action.songs;
			newState.likes = action.likes;
			return newState;
		default:
			return state;
	}
};

export default likedSongsReducer;
