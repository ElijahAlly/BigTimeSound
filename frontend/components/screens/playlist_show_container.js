import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import {
	fetchPlaylist,
	updatePlaylist,
	createPlaylist,
	deletePlaylist,
	addSongToPlaylist,
	fetchAllPlaylists,
	fetchAllPlaylistIds,
} from '../../actions/playlist_actions';
import PlaylistShow from './playlist_show';
import { clearSearchResults } from '../../actions/search_actions';
import { assignImagesToSongs } from '../../util/general_functions/assign_functions';
import { pauseSong, playSong } from '../../actions/song/currently_playing';
import { receiveSongQueue } from '../../actions/song/song_queue_actions';
import { selectSongsForPlaylist } from '../../util/general_functions/select_songs_for_playlist';
import { unlikeSong, likeSong } from '../../actions/song/song_actions';
import { addBackPath } from '../../actions/path_actions';

const mSTP = (
	{
		entities: { user, playlists, likedSongs, albums, playlistIds, songs },
		session,
		ui,
	},
	ownProps
) => {
	let playlistId = ownProps.match.params.id;
	return {
		playlists,
		history: ownProps.history,
		playingFrom: ui.currentlyPlaying.playingFrom,
		shuffleIsOn: ui.currentlyPlaying.shuffleIsOn,
		currentTime: ui.currentlyPlaying.currentTime,
		isPlaying: ui.currentlyPlaying.isPlaying,
		audio: ui.currentlyPlaying.audio,
		volume: ui.currentlyPlaying.volume,
		song: ui.currentlyPlaying.song,
		searchInput: ui.search.input,
		location: playlistId,
		likedSongs: Object.values(likedSongs.songs),
		likedSongsObj: likedSongs.songs,
		likes: likedSongs.likes,
		currentUser: user[session.currentUser],
		playlist: playlists[playlistId],
		searchedSongs: assignImagesToSongs(ui.search.results.songs, albums),
		playlistSongs: selectSongsForPlaylist(
			songs,
			playlistIds.playlistIds,
			playlistId
		),
		playlistIds: playlistIds.playlistIds,
		songs: selectSongsForPlaylist(songs, playlistIds.playlistIds, playlistId),
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
	openModal: (modal, props, imgSrc) => dispatch(openModal(modal, props, imgSrc)),
	clearSearchResults: () => dispatch(clearSearchResults()),
	receiveSongQueue: (queue) => dispatch(receiveSongQueue(queue)),
	pauseSong: () => dispatch(pauseSong()),
	likeSong: (userId, songId) => dispatch(likeSong(userId, songId)),
	unlikeSong: (userId, likeId) => dispatch(unlikeSong(userId, likeId)),
	playSong: (song, audio, playingFrom, currentTime, volume, duration) =>
		dispatch(playSong(song, audio, playingFrom, currentTime, volume, duration)),
	fetchAllPlaylistIds: (userId) => dispatch(fetchAllPlaylistIds(userId)),
	addSongToPlaylist: (userId, songId, playlistId) =>
		dispatch(addSongToPlaylist(userId, songId, playlistId)),
		addBackPath: () => dispatch(addBackPath())
});

export default withRouter(connect(mSTP, mDTP)(PlaylistShow));
