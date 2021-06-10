import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import playlistReducer from './playlist_reducer'
import allPlaylistReducer from './all_playlists_reducer'
import songsReducer from './songs_reducer'
import albumReducer from './album_reducer'

const entities = combineReducers({
	user: userReducer,
	playlist: playlistReducer,
	playlists: allPlaylistReducer,
	songs: songsReducer,
	albums: albumReducer,
});

export default entities;
