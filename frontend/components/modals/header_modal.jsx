import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { deleteSession } from '../../actions/session_actions';
import { pauseSong } from '../../actions/currently_playing';
import { Link } from 'react-router-dom';

const HeaderModal = ({ logout, currentUser, closeModal, audio, pauseSong }) => {
	const logoutUser = () => {
		logout().then(() => {
			closeModal()
			if (audio.duration) pauseSong(audio);
		})
	}

	return (
		<>
			<button
			id='profile-link'
				onClick={() =>
					(<Link to={`/users/${currentUser.id}/profile`} />).then(() =>
						closeModal()
					)
				}>
				Profile
			</button>
			<button id='logout-link' onClick={() => logoutUser()}>Logout</button>
		</>
	);
};

const mSTP = ({entities, ui, session}, ownProps) => {
	return {
		currentUser: entities.user[session.currentUser],
		audio: ui.currentlyPlaying.audio,
	};
};

const mDTP = (dispatch) => {
	return {
		logout: () => dispatch(deleteSession()),
		closeModal: () => dispatch(closeModal()),
		pauseSong: (audio) => dispatch(pauseSong(audio)),
	};
};

export default connect(mSTP, mDTP)(HeaderModal);
