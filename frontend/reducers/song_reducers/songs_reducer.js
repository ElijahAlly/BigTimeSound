import {
	RECEIVE_ALL_SONGS,
    CLEAR_ALL_SONGS
} from '../../actions/song/song_actions';

const _noSongs = [];

const songsReducer = (state = _noSongs, action) => {
	Object.freeze(state);

	switch (action.type) {
		case RECEIVE_ALL_SONGS:
			return action.songs;
		case CLEAR_ALL_SONGS:
			return _noSongs;
		default:
			return state;
	}
};

export default songsReducer;
