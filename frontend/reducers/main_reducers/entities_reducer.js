import { combineReducers } from 'redux';
import userReducer from '../user_reducer';
import playlistReducer from '.././playlist_reducers/playlist_reducer'
import allPlaylistReducer from '.././playlist_reducers/all_playlists_reducer'
import playlistIdsReducer from '.././playlist_reducers/playlist_ids_reducer'
import songsReducer from '.././song_reducers/songs_reducer'
import likedSongsReducer from '.././song_reducers/liked_songs_reducer'
import albumReducer from '../album_reducer'
import artistsReducer from '../artists_reducer'

const entities = combineReducers({
	user: userReducer,
	playlist: playlistReducer,
	playlists: allPlaylistReducer,
	playlistIds: playlistIdsReducer,
	songs: songsReducer,
	likedSongs: likedSongsReducer,
	albums: albumReducer,
	artists: artistsReducer,
});

export default entities;
