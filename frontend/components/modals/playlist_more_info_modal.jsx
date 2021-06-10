import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { deletePlaylist } from '../../actions/playlist_actions';

const PlaylistMoreInfoModal = ({ currentUser, playlistId, deletePlaylist, closeModal }) => {
	return (
		<>
            
		</>
	);
};

const mSTP = (state, ownProps) => {
	return {
		currentUser: state.entities.user[state.session.currentUser],
        playlistId: parseInt(ownProps.props.match.params.id)
	};
};

const mDTP = (dispatch) => {
	return {
        deletePlaylist: (userId, playlistId) => dispatch(deletePlaylist),
		closeModal: () => dispatch(closeModal()),
	};
};

export default connect(mSTP, mDTP)(PlaylistMoreInfoModal);
