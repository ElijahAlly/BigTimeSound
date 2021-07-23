import {
	RECEIVE_SINGLE_USER,
	LOGOUT_CURRENT_USER,
} from '../../actions/session_actions';

const sessionReducer = (state = {}, action) => {
	Object.freeze(state);
	const newState = Object.assign({}, state);

	switch (action.type) {
		case RECEIVE_SINGLE_USER:
			Object.assign(newState, { currentUser: action.user.id });
			return newState;
		case LOGOUT_CURRENT_USER:
			Object.assign(newState, { currentUser: null });
			return newState;
		default:
			return state;
	}
};

export default sessionReducer;
