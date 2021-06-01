import { combineReducers } from 'redux';

const entities = combineReducers({
    user,
	playlists,
    likedSongs,
});

export default entities;