export const createSession = (user) => {
	return $.ajax({
		url: '/api/session',
		method: 'POST',
		data: { user },
	});
};

export const deleteSession = () => {
	return $.ajax({
		url: '/api/session',
		method: 'DELETE',
	});
};
