import { RECEIVE_SINGLE_USER } from '../actions/user_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

const userReducer = (state = {}, action) => {
	Object.freeze(state);
	const newState = Object.assign({}, state);

	switch (action.type) {
		case RECEIVE_SINGLE_USER:
			Object.assign(newState, { [action.user.id]: action.user });
            return newState;
		case LOGOUT_CURRENT_USER:
			return {}; 
		default:
			return state;
	}
};

export default userReducer;
