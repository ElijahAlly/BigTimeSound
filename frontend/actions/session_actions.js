import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

const receiveErrors = (errors) => ({
	type: RECEIVE_SESSION_ERRORS,
	errors,
});

export const clearErrors = () => ({
	type: CLEAR_SESSION_ERRORS,
});

const receiveUser = (user) => ({
	type: RECEIVE_SINGLE_USER,
	user,
});

const logoutCurrentUser = () => ({
	type: LOGOUT_CURRENT_USER,
});

export const createSession = (user) => (dispatch) =>
	SessionApiUtil.createSession(user).then(
		(user) => dispatch(receiveUser(user)),
		(err) => dispatch(receiveErrors(err.responseJSON))
	);

export const deleteSession = () => (dispatch) =>
	SessionApiUtil.deleteSession().then(() => dispatch(logoutCurrentUser()));
