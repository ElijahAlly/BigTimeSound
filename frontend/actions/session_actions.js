import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

const receiveUser = (user) => ({
	type: RECEIVE_SINGLE_USER,
	user,
});

const logoutCurrentUser = () => ({
	type: LOGOUT_CURRENT_USER,
});

export const createSession = (user) => (dispatch) =>
	SessionApiUtil.createSession(user).then((user) => dispatch(receiveUser(user)));

export const deleteSession = () => (dispatch) =>
	SessionApiUtil.deleteSession().then(() => dispatch(logoutCurrentUser()));

