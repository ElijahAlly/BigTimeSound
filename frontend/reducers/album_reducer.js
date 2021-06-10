import {
	RECEIVE_ALBUM,
} from '../actions/album_actions';

const _noAlbum = {};

const albumReducer = (state = _noAlbum, action) => {
	Object.freeze(state);

	switch (action.type) {
		case RECEIVE_ALBUM:
			return action.album;
		default:
			return state;
	}
};

export default albumReducer;
