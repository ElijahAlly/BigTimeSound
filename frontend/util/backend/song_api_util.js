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

export const likeSong = (userId, songId) => {
	return $.ajax({
		url: `/api/users/${userId}/likes/${songId}`,
		method: 'POST',
	});
};

export const unlikeSong = (userId, songId) => {
	return $.ajax({
		url: `/api/users/${userId}/likes/${songId}`,
		method: 'DELETE',
	});
};