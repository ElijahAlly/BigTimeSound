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
			<button
				id='profile-link'
				onClick={() =>
					(<Link to={`/users/${currentUser.id}/profile`} />).then(() =>
						closeModal()
					)
				}>
				Profile
			</button>
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
