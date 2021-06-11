import {
	RECEIVE_ALBUMS,
} from '../actions/album_actions';

const _noAlbum = {};

const albumReducer = (state = _noAlbum, action) => {
	Object.freeze(state);

	switch (action.type) {
		case RECEIVE_ALBUMS:
			return action.albums;
		default:
			return state;
	}
};

export default albumReducer;
