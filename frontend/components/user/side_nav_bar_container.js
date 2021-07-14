import { connect } from 'react-redux';
import SideNavBar from './side_nav_bar';

import {
	fetchAllPlaylists,
	fetchPlaylist,
} from '../../actions/playlist_actions';
import { withRouter } from 'react-router';
import { addBackPath } from '../../actions/path_actions';

const mSTP = (state, ownProps) => {
	return ({
		currentUser: state.entities.user[state.session.currentUser],
		playlists: state.entities.playlists,
		history: ownProps.history,
		goBackCount: state.ui.path.goBackCount,
		goForwardCount: state.ui.path.goForwardCount,
	})
};

const mDTP = (dispatch) => ({
	fetchAllPlaylists: (userId) => dispatch(fetchAllPlaylists(userId)),
	fetchPlaylist: (userId, playlistId) =>
		dispatch(fetchPlaylist(userId, playlistId)),
	addBackPath: () => dispatch(addBackPath())
});

export default withRouter(connect(mSTP, mDTP)(SideNavBar));
