export const fetchArtists = () => {
	return $.ajax({
		url: `/api/artists`,
		method: 'GET',
	});
};