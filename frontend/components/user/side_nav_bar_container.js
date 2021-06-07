import { connect } from 'react-redux';
import SideNavBar from './side_nav_bar';
import { fetchAllPlaylists, fetchPlaylist } from '../../actions/playlist_actions';

const mSTP = (state, ownProps) => ({
	currentUser: state.entities.user[state.session.currentUser],
	playlists: state.entities.playlists,
});

const mDTP = (dispatch) => ({
	fetchAllPlaylists: (userId) => dispatch(fetchAllPlaylists(userId)),
    fetchPlaylist: (userId, playlistId) => dispatch(fetchPlaylist(userId, playlistId)),
});

export default connect(mSTP, mDTP)(SideNavBar);
