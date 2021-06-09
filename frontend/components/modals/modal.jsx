import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import EditPlaylistForm from './playlist_modal';
import HeaderModal from './header_modal';

const Modal = ({ modal, closeModal }) => {
	if (!modal) return null;

	let component;
	let classname;
	switch (modal.modal) {
		case 'edit-playlist-modal':
			component = <EditPlaylistForm />;
			classname = 'edit-playlist-modal';
			break;
		case 'header-modal':
			component = <HeaderModal />;
			classname = 'header-modal';
			break;
		default:
			return null;
	}

	return (
		<div className='modal-background'>
			<div className='modal-close' onClick={() => closeModal()} />
			<div className={classname} onClick={(e) => e.stopPropagation()}>
				{component}
			</div>
		</div>
	);
};

const mSTP = ({ ui }, ownProps) => ({
	modal: ui.modal,
});

const mDTP = (dispatch) => ({
	closeModal: () => dispatch(closeModal()),
});

export default connect(mSTP, mDTP)(Modal);
