import { connect } from 'react-redux';
import { updatePlaylist } from '../../actions/playlist_actions';
import PlaylistModal from './playlist_modal';

const mSTP = (state, ownProps) => {
	return ({
		currenUser: state.entities.user[state.session.currentUser],
		playlists: state.entities.playlists
	})
}

const mDTP = (dispatch) => ({
	updatePlaylist: (userId, playlist) =>
		dispatch(updatePlaylist(userId, playlist)),
});

export default connect(mSTP, mDTP)(PlaylistModal);
