export const fetchSong = (songId) => {
	return $.ajax({
		url: `/api/songs/${songId}`,
		method: 'GET',
	});
};

export const fetchAllSongs = () => {
	return $.ajax({
		url: `/api/songs`,
		method: 'GET',
	});
};

export const fetchLikedSongs = (userId) => {
	return $.ajax({
		url: `/api/users/${userId}/likes`,
		method: 'GET',
	});
};

export const likeSong = (user_id, song_id) => {
	return $.ajax({
		url: `/api/users/${user_id}/likes`,
		method: 'POST',
		data: {song_id}
	});
};

export const unlikeSong = (user_id, id) => {
	return $.ajax({
		url: `/api/users/${user_id}/likes/${id}`,
		method: 'DELETE',
	});
};
