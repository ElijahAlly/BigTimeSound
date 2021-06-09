import { connect } from 'react-redux';
import { fetchPlaylist, fetchAllPlaylists, updatePlaylist, createPlaylist, deletePlaylist } from '../../actions/playlist_actions';
import PlaylistShow from './playlist_show';

const mSTP = ({ entities: { user, playlists, playlist }, session }, ownProps) => {
	console.log('psC',ownProps )
	return ({
		currentUser: user[session.currentUser],
		playlists,
		location: parseInt(ownProps.location.pathname.slice(-1))
	})
};

const mDTP = (dispatch) => ({
	fetchAllPlaylists: (userId) => dispatch(fetchAllPlaylists(userId)),
	updatePlaylist: (userId, playlist) => dispatch(updatePlaylist(userId, playlist)),
	fetchPlaylist: (userId, playlistId) => dispatch(fetchPlaylist(userId, playlistId)),
	deletePlaylist: (userId, playlistId) => dispatch(deletePlaylist(userId, playlistId)),
	createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),

});

export default connect(mSTP, mDTP)(PlaylistShow);
