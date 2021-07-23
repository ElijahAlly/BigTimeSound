export const createPlaylist = (playlist) => {
	return $.ajax({
		url: `/api/users/${playlist.user_id}/playlists`,
		method: 'POST',
		data: { playlist },
	});
};

export const deletePlaylist = (userId, playlistId) => {
	return $.ajax({
		url: `/api/users/${userId}/playlists/${playlistId}`,
		method: 'DELETE',
	});
};

export const fetchPlaylist = (userId, playlistId) => {
	return $.ajax({
		url: `/api/users/${userId}/playlists/${playlistId}`,
		method: 'GET',
	});
};

export const fetchAllPlaylists = (userId) => {
	return $.ajax({
		url: `/api/users/${userId}/playlists`,
		method: 'GET',
	});
};

export const updatePlaylist = (userId, playlist) => {
	return $.ajax({
		url: `/api/users/${userId}/playlists/${playlist.id}`,
		method: 'PATCH',
		data: { playlist },
	});
};

export const fetchAllPlaylistIds = (userId) => {
	return $.ajax({
		url: `/api/users/${userId}/playlist_inclusions`,
		method: 'GET',
	});
};

export const addSongToPlaylist = (userId, songId, playlistId) => {
	return $.ajax({
		url: `/api/users/${userId}/playlist_inclusions/`,
		method: 'POST',
		data: { songId, playlistId },
	});
};
