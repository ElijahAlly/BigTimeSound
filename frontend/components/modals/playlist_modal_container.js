import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { closeModal } from '../../actions/modal_actions';
import {
	fetchAllPlaylists,
	updatePlaylist,
} from '../../actions/playlist_actions';
import PlaylistModal from './playlist_modal';

const mSTP = (state, ownProps) => {
	return {
		currenUser: state.entities.user[state.session.currentUser],
		playlists: state.entities.playlists,
		playlist: state.entities.playlists[parseInt(ownProps.props.match.params.id)],
		imgSrc: ownProps.imgSrc
	};
};

const mDTP = (dispatch) => ({
	fetchAllPlaylists: (userId) => dispatch(fetchAllPlaylists(userId)),
	updatePlaylist: (userId, playlist) => dispatch(updatePlaylist(userId, playlist)), 
	closeModal: () => dispatch(closeModal()),
});

export default withRouter(connect(mSTP, mDTP)(PlaylistModal));
