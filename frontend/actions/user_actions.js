import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_SINGLE_USER = 'RECEIVE_SINGLE_USER';

const receiveUser = (user) => ({
	type: RECEIVE_SINGLE_USER,
	user,
});

export const createUser = (user) => (dispatch) =>
	UserApiUtil.createUser(user).then((user) => dispatch(receiveUser(user)));

export const fetchUser = (userId) => (dispatch) =>
	UserApiUtil.fetchUser(userId).then((user) => dispatch(receiveUser(user)));
