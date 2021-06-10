export const fetchAlbums = () => {
	return $.ajax({
		url: `/api/albums`,
		method: 'GET',
	});
};