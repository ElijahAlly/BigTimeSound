import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { updatePlaylist } from '../../actions/playlist_actions';
import PlaylistModal from './playlist_modal';

const mSTP = (state, ownProps) => {
	console.log('pMC', ownProps)
	return ({
		currenUser: state.entities.user[state.session.currentUser],
		playlists: state.entities.playlists,
		playlist: state.entities.playlists[parseInt(ownProps)]
	});
};

const mDTP = (dispatch) => ({
	updatePlaylist: (userId, playlist) =>
		dispatch(updatePlaylist(userId, playlist)),
	closeModal: () => dispatch(closeModal()),
});

export default connect(mSTP, mDTP)(PlaylistModal);
