import * as SearchApiUtil from '../util/backend/search_api_util';

export const SEND_SEARCH = 'SEND_SEARCH';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const SEND_SEARCH_RESULTS = 'SEND_SEARCH_RESULTS';

export const sendSearch = (input) => ({
	type: SEND_SEARCH,
	input,
});

export const clearSearchResults = () => ({
	type: CLEAR_SEARCH_RESULTS,
});

const sendSearchResults = (results) => {
	return {
		type: SEND_SEARCH_RESULTS,
		results,
	};
};

export const fetchSearchResults = (input) => (dispatch) =>
	SearchApiUtil.fetchSearchResults(input).then(
		(res) => dispatch(sendSearchResults(res)),
		(err) => dispatch(console.log(err))
	);
