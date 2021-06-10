import {
	RECEIVE_ALBUMS,
} from '../actions/album_actions';

const _noAlbum = {};

const albumReducer = (state = _noAlbum, action) => {
	Object.freeze(state);
	const newState = {}

	switch (action.type) {
		case RECEIVE_ALBUMS:
			console.log(action.albums.albums)
			action.albums.albums.forEach((album) => {
				newState[album.id] = album;
			})
			return newState;
		default:
			return state;
	}
};

export default albumReducer;
