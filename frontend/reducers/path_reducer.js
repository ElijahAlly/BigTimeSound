import {
	ADD_BACK_PATH,
	REMOVE_BACK_PATH,
	ADD_FORWARD_PATH,
	REMOVE_FORWARD_PATH,
	RESET_PATH_COUNTS,
} from '../actions/path_actions';

const _InitialState = {
	goBackCount: 0,
	goForwardCount: 0,
};

export default function pathReducer(state = _InitialState, action) {
	Object.freeze(state);
	let newState = Object.assign({}, state);

	switch (action.type) {
		case ADD_BACK_PATH:
			++newState.goBackCount;
			return newState;

		case REMOVE_BACK_PATH:
			--newState.goBackCount;
			return newState;

		case ADD_FORWARD_PATH:
			++newState.goForwardCount;
			return newState;

		case REMOVE_FORWARD_PATH:
			--newState.goForwardCount;
			return newState;

		case RESET_PATH_COUNTS:
			newState.goBackCount = 0;
			newState.goForwardCount = 0;
			return newState;

		default:
			return state;
	}
}
