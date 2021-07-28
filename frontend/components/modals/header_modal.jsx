import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { deleteSession } from '../../actions/session_actions';
import { pauseSong } from '../../actions/song/currently_playing';
import { clearQueueHistory } from '../../actions/song/song_queue_actions';
import { Link } from 'react-router-dom';

const HeaderModal = ({
	logout,
	currentUser,
	closeModal,
	audio,
	pauseSong,
	isPlaying,
	clearQueueHistory,
}) => {
	const logoutUser = () => {
		logout().then(() => {
			closeModal();
			if (isPlaying || audio.duration) pauseSong();
			clearQueueHistory();
		});
	};

	return (
		<>
			<a
				href='https://github.com/ElijahAlly/BigTimeSound'
				id='github-link'
				target='_blank'>
				<i className="fab fa-github"></i>
				GitHub
			</a>
			<a
				href='https://www.linkedin.com/in/elijah-ally-123ea/'
				id='linkedin-link'
				target='_blank'>
				<i className="fab fa-linkedin"></i>
				LinkedIn
			</a>
			<a
				href='https://elijahally.github.io/ElijahAllyPortfolio/'
				id='portfolio-link'
				target='_blank'>
				My Portfolio
			</a>
			<button id='logout-link' onClick={() => logoutUser()}>
				Logout
			</button>
		</>
	);
};

const mSTP = ({ entities, ui, session }, ownProps) => {
	return {
		currentUser: entities.user[session.currentUser],
		audio: ui.currentlyPlaying.audio,
		isPlaying: ui.currentlyPlaying.isPlaying,
	};
};

const mDTP = (dispatch) => {
	return {
		logout: () => dispatch(deleteSession()),
		closeModal: () => dispatch(closeModal()),
		pauseSong: () => dispatch(pauseSong()),
		clearQueueHistory: () => dispatch(clearQueueHistory()),
	};
};

export default connect(mSTP, mDTP)(HeaderModal);
