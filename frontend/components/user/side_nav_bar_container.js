import { connect } from 'react-redux';
import SideNavBar from './side_nav_bar';

import {
	fetchAllPlaylists,
	fetchPlaylist,
} from '../../actions/playlist_actions';
import { withRouter } from 'react-router';
import { addBackPath } from '../../actions/path_actions';
import {pauseSong} from '../../actions/currently_playing'

const mSTP = ({session, ui, entities}, ownProps) => {
	return ({
		userId: session.currentUser,
		playlists: entities.playlists,
		history: ownProps.history,
		goBackCount: ui.path.goBackCount,
		goForwardCount: ui.path.goForwardCount,
		isPlaying: ui.currentlyPlaying.isPlaying,
		playingFrom: ui.currentlyPlaying.playingFrom,
		audio: ui.currentlyPlaying.audio,
		path: ownProps.match.path
	})
};

const mDTP = (dispatch) => ({
	fetchAllPlaylists: (userId) => dispatch(fetchAllPlaylists(userId)),
	fetchPlaylist: (userId, playlistId) =>
		dispatch(fetchPlaylist(userId, playlistId)),
	addBackPath: () => dispatch(addBackPath()),
	pauseSong: (noAudio) => dispatch(pauseSong(noAudio))
});

export default withRouter(connect(mSTP, mDTP)(SideNavBar));
