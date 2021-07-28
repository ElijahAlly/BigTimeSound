import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import PlaylistModalContainer from './playlist_modal_container';
import HeaderModal from './header_modal';

const Modal = ({ modal, closeModal, props, imgSrc }) => {
	if (!modal) return null;

	let classnamesToDarken = ['edit-playlist-modal'] // add classname to darken modal background
	let component;
	let classname;
	switch (modal) {
		case 'edit-playlist-modal':
			component = <PlaylistModalContainer props={props} imgSrc={imgSrc} />;
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
		<div className='modal-background' id={classnamesToDarken.includes(classname) ? 'darken-background' : ''} onClick={() => closeModal()}>
			<div className={classname} onClick={(e) => e.stopPropagation()}>
				{component}
			</div>
		</div>
	);
};

const mSTP = ({ ui }, ownProps) => ({
	modal: ui.modal.modal,
	props: ui.modal.props,
	imgSrc: ui.modal.imgSrc
});

const mDTP = (dispatch) => ({
	closeModal: () => dispatch(closeModal()),
});

export default connect(mSTP, mDTP)(Modal);
