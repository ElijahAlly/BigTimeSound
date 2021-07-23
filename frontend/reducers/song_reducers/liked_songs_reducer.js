import {
	RECEIVE_LIKED_SONGS,
} from '../../actions/song/song_actions';

const _noSongs = {};

const likedSongsReducer = (state = _noSongs, action) => {
	Object.freeze(state);

	switch (action.type) {
		case RECEIVE_LIKED_SONGS:
			return action.songs;
		default:
			return state;
	}
};

export default likedSongsReducer;
