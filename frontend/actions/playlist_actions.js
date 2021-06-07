import * as PlaylistApiUtil from '../util/playlist_api_util';

export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';
export const RECEIVE_ALL_PLAYLIST = 'RECEIVE_ALL_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_PLAYLIST_ERRORS = 'RECEIVE_PLAYLIST_ERRORS';
export const CLEAR_PLAYLIST_ERRORS = 'CLEAR_PLAYLIST_ERRORS';

const receivePlaylistErrors = (errors) => {
	return {
		type: RECEIVE_PLAYLIST_ERRORS,
		errors,
	};
};

export const clearPlaylistErrors = () => ({
	type: CLEAR_PLAYLIST_ERRORS,
});

const receivePlaylist = (playlist) => ({
	type: RECEIVE_PLAYLIST,
	playlist,
});

const receiveAllPlaylists = (playlists) => ({
	type: RECEIVE_ALL_PLAYLIST,
	playlists,
});

const removePlaylist = (playlistId) => ({
	type: DELETE_PLAYLIST,
	playlistId,
});

// sLATT = Playlist.create!(name: 'SLATT', user_id: 1)

export const createPlaylist = (playlist) => (dispatch) =>
	PlaylistApiUtil.createPlaylist(playlist).then(
		(playlist) => dispatch(receivePlaylist(playlist)),
		(err) => dispatch(receivePlaylistErrors(err.responseJSON))
	);

export const updatePlaylist = (userId, playlist) => (dispatch) =>
	PlaylistApiUtil.updatePlaylist(userId, playlist).then(
		(playlist) => dispatch(receivePlaylist(playlist)),
		(err) => dispatch(receivePlaylistErrors(err.responseJSON))
	);

export const deletePlaylist = (userId, playlistId) => (dispatch) =>
	PlaylistApiUtil.deletePlaylist(userId, playlistId).then(() =>
		dispatch(removePlaylist(playlistId))
	);

export const fetchPlaylist = (userId, playlistId) => (dispatch) =>
	PlaylistApiUtil.fetchPlaylist(userId, playlistId).then(
		(playlist) => dispatch(receivePlaylist(playlist)),
		(err) => dispatch(receivePlaylistErrors(err.responseJSON))
	);

export const fetchAllPlaylists = (userId) => (dispatch) =>
	PlaylistApiUtil.fetchAllPlaylists(userId).then((playlists) =>
		dispatch(receiveAllPlaylists(playlists))
	);
