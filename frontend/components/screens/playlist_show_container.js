import { connect } from 'react-redux';
import { fetchPlaylist } from '../../actions/playlist_actions';
import PlaylistShow from './playlist_show';

const mSTP = ({ entities: { user, playlists, playlist }, session }, ownProps) => {
	return ({
		currentUser: user[session.currentUser],
		playlists,
		playlist 
	})
};

const mDTP = (dispatch) => ({
	fetchPlaylist: (userId, playlistId) =>
		dispatch(fetchPlaylist(userId, playlistId)),
});

export default connect(mSTP, mDTP)(PlaylistShow);
