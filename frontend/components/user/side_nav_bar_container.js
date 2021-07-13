import { connect } from 'react-redux';
import SideNavBar from './side_nav_bar';

import {
	fetchAllPlaylists,
	fetchPlaylist,
} from '../../actions/playlist_actions';
import { withRouter } from 'react-router';

const mSTP = (state, ownProps) => {
	return ({
		currentUser: state.entities.user[state.session.currentUser],
		playlists: state.entities.playlists,
		history: ownProps.history
	})
};

const mDTP = (dispatch) => ({
	fetchAllPlaylists: (userId) => dispatch(fetchAllPlaylists(userId)),
	fetchPlaylist: (userId, playlistId) =>
		dispatch(fetchPlaylist(userId, playlistId)),
});

export default withRouter(connect(mSTP, mDTP)(SideNavBar));
