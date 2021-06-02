import { CLEAR_SESSION_ERRORS, RECEIVE_SESSION_ERRORS } from '../actions/session_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
	Object.freeze(state);

	switch (action.type) {
		case RECEIVE_SESSION_ERRORS:
			return { errors: action.errors };
		case CLEAR_SESSION_ERRORS:
			return _nullErrors;
		default:
			return state;
	}
};

export default SessionErrorsReducer;
