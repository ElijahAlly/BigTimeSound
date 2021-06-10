import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import { fetchPlaylist, fetchAllPlaylists, updatePlaylist, createPlaylist, deletePlaylist } from '../../actions/playlist_actions';
import PlaylistShow from './playlist_show';

const mSTP = ({ entities: { user, playlists }, session }, ownProps) => {
	return ({
		currentUser: user[session.currentUser],
		playlists,
		playlist: playlists[parseInt(ownProps.location.pathname.slice(-1))],
		location: parseInt(ownProps.location.pathname.slice(-1))
	})
};

const mDTP = (dispatch) => ({
	fetchAllPlaylists: (userId) => dispatch(fetchAllPlaylists(userId)),
	updatePlaylist: (userId, playlist) => dispatch(updatePlaylist(userId, playlist)),
	fetchPlaylist: (userId, playlistId) => dispatch(fetchPlaylist(userId, playlistId)),
	deletePlaylist: (userId, playlistId) => dispatch(deletePlaylist(userId, playlistId)),
	createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
	openModal: (modal, props) => dispatch(openModal(modal, props))
});

export default withRouter(connect(mSTP, mDTP)(PlaylistShow));
