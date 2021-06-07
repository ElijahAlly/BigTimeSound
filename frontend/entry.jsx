import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

import * as playlistActions from './actions/playlist_actions';

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

	window.createPlaylist = playlistActions.createPlaylist;
	window.deletePlaylist = playlistActions.deletePlaylist;
	window.updatePlaylist = playlistActions.updatePlaylist;
	window.fetchPlaylist = playlistActions.fetchPlaylist;
	window.fetchAllPlaylists = playlistActions.fetchAllPlaylists;

	const root = document.getElementById('root');
	ReactDOM.render(<Root store={store} />, root);

	
});
