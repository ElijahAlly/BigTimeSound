import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

import * as playlistActions from './actions/playlist_actions';
import { deleteSession } from './actions/session_actions';
import {fetchAllSongs, fetchSong} from './util/song_api_util'
import {fetchAlbum} from './util/album_api_util'
import { clearSongErrors } from './actions/song_actions';

document.addEventListener('DOMContentLoaded', () => {
	let preloadedState = undefined;
	if (window.currentUser) {
		preloadedState = {
			session: {
				currentUser: window.currentUser[0],
			},
			entities: {
				user: {
					[window.currentUser[1].id]: window.currentUser[1],
				},
			},
		};
	}

	const store = configureStore(preloadedState);

	window.getState = store.getState;
	window.dispatch = store.dispatch;
	window.deleteSession = deleteSession
	window.createPlaylist = playlistActions.createPlaylist;
	window.deletePlaylist = playlistActions.deletePlaylist;
	window.updatePlaylist = playlistActions.updatePlaylist;
	window.fetchPlaylist = playlistActions.fetchPlaylist;
	window.fetchSong = fetchSong;
	window.fetchAllSongs = fetchAllSongs;
	window.fetchAlbum = fetchAlbum;
	window.clearSongErrors = clearSongErrors;

	const root = document.getElementById('root');
	ReactDOM.render(<Root store={store} />, root);

	
});
