import { connect } from 'react-redux';
import { createPlaylist, fetchAllPlaylists, fetchPlaylist } from '../../actions/playlist_actions';
import CreatePlaylistScreen from './create_playlist_screen';

const mSTP = ({ entities: { user, playlists, playlist }, session }, ownProps) => ({
	currentUser: user[session.currentUser],
	playlists,
	playlist
});

const mDTP = (dispatch) => ({
	createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
	fetchAllPlaylists: (userId) => dispatch(fetchAllPlaylists(userId)),
	fetchPlaylist: (userId, playlistId) => dispatch(fetchPlaylist(userId, playlistId)),
});

export default connect(mSTP, mDTP)(CreatePlaylistScreen);
