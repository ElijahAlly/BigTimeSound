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
