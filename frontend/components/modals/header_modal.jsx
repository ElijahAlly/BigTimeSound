import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { deleteSession } from '../../actions/session_actions';
import { Link } from 'react-router-dom';

const HeaderModal = ({ logout, currentUser, closeModal }) => {
	return (
		<>
			<button
				onClick={() =>
					(<Link to={`/users/${currentUser.id}/profile`} />).then(() =>
						closeModal()
					)
				}>
				Profile
			</button>
			<button onClick={() => logout().then(() => closeModal())}>logout</button>
		</>
	);
};

const mSTP = (state, ownProps) => {
	return {
		currentUser: state.entities.user[state.session.currentUser],
	};
};

const mDTP = (dispatch) => {
	return {
		logout: () => dispatch(deleteSession()),
		closeModal: () => dispatch(closeModal()),
	};
};

export default connect(mSTP, mDTP)(HeaderModal);