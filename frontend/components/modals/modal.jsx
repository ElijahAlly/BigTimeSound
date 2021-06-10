import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import PlaylistModalContainer from './playlist_modal_container';
import HeaderModal from './header_modal';
import PlaylistMoreInfoModalContainer from './playlist_more_info_modal';

const Modal = ({ modal, closeModal, props }) => {
	if (!modal) return null;

	let component;
	let classname;
	switch (modal) {
		case 'edit-playlist-modal':
			component = <PlaylistModalContainer props={props}/>;
			classname = 'edit-playlist-modal';
			break;
		case 'header-modal':
			component = <HeaderModal />;
			classname = 'header-modal';
			break;
		case 'playlist-more-info-modal':
			component = <PlaylistMoreInfoModalContainer props={props}/>
			classname = 'playlist-more-info-modal'
		default:
			return null;
	}

	return (
		<div className='modal-background' onClick={() => closeModal()}>
			<div className={classname} onClick={(e) => e.stopPropagation()}>
				{component}
			</div>
		</div>
	);
};

const mSTP = ({ ui }, ownProps) => ({
	modal: ui.modal.modal,
	props: ui.modal.props
});

const mDTP = (dispatch) => ({
	closeModal: () => dispatch(closeModal()),
});

export default connect(mSTP, mDTP)(Modal);
