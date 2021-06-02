import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';
export const CLEAR_USER_ERRORS = 'CLEAR_USER_ERRORS';

const receiveErrors = (errors) => ({
	type: RECEIVE_USER_ERRORS,
	errors,
});

export const clearErrors = () => ({
	type: CLEAR_USER_ERRORS,
});

const receiveUser = (user) => ({
	type: RECEIVE_SINGLE_USER,
	user,
});

export const createUser = (user) => (dispatch) =>
	UserApiUtil.createUser(user).then(
		(user) => dispatch(receiveUser(user)),
		(err) => dispatch(receiveErrors(err.responseJSON))
	);

export const fetchUser = (userId) => (dispatch) =>
	UserApiUtil.fetchUser(userId).then((user) => dispatch(receiveUser(user)));
