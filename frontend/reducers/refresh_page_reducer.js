import {
	REFRESH_PAGE
} from '../actions/refresh_page_actions';

const _initialState = {
    count: 0
}

const refreshPageReducer = (state = {}, action) => {
	Object.freeze(state);
	const newState = Object.assign({}, state);

	switch (action.type) {
		case REFRESH_PAGE:
            newState.count++
			return newState;
		default:
			return state;
	}
};

export default refreshPageReducer;
