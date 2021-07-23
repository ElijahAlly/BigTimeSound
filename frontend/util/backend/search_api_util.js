export const fetchSearchResults = (input) => {
	return $.ajax({
		url: '/api/search',
		method: 'GET',
		data: { input },
	});
};