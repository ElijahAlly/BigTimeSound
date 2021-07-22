import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import {
	fetchPlaylist,
	fetchAllPlaylists,
	updatePlaylist,
	createPlaylist,
	deletePlaylist,
	addSongToPlaylist,
} from '../../actions/playlist_actions';
import { clearSearch } from '../../actions/search_actions';
import PlaylistShow from './playlist_show';
import { assignImagesToSongs } from '../../util/assign_functions';

const mSTP = (
	{ entities: { user, playlists, likedSongs, albums, songs }, session, ui },
	ownProps
) => {
	return {
		currentUser: user[session.currentUser],
		playlists,
		playlist: playlists[ownProps.match.params.id],
		location: ownProps.match.params.id,
		likedSongs: Object.values(likedSongs),
		searchedSongs: assignImagesToSongs(ui.search.results.songs, albums),
		searchInput: ui.search.input,
	};
};

const mDTP = (dispatch) => ({
	fetchAllPlaylists: (userId) => dispatch(fetchAllPlaylists(userId)),
	updatePlaylist: (userId, playlist) =>
		dispatch(updatePlaylist(userId, playlist)),
	fetchPlaylist: (userId, playlistId) =>
		dispatch(fetchPlaylist(userId, playlistId)),
	deletePlaylist: (userId, playlistId) =>
		dispatch(deletePlaylist(userId, playlistId)),
	createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
	openModal: (modal, props) => dispatch(openModal(modal, props)),
	clearSearch: () => dispatch(clearSearch()),
	addSongToPlaylist: (songId, playlistId) =>
		dispatch(addSongToPlaylist(songId, playlistId)),
});

export default withRouter(connect(mSTP, mDTP)(PlaylistShow));
