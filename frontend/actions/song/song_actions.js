import * as SongApiUtil from '../../util/backend/song_api_util';

export const RECEIVE_ALL_SONGS = 'RECEIVE_ALL_SONGS';
export const CLEAR_ALL_SONGS = 'CLEAR_ALL_SONGS';
export const CLEAR_SONG_ERRORS = 'CLEAR_SONG_ERRORS';
export const RECEIVE_LIKED_SONGS = 'RECEIVE_LIKED_SONGS';

const receiveAllSongs = (songs) => ({
	type: RECEIVE_ALL_SONGS,
	songs,
});

export const clearAllSongs = () => ({
	type: CLEAR_ALL_SONGS,
});

export const clearSongErrors = () => ({
	type: CLEAR_SONG_ERRORS,
});

const recieveLikedSongs = ({ data }) => ({
	type: RECEIVE_LIKED_SONGS,
	likes: data.likes,
	songs: data.songs,
});

export const fetchAllSongs = () => (dispatch) =>
	SongApiUtil.fetchAllSongs().then((songs) => dispatch(receiveAllSongs(songs)));

export const fetchLikedSongs = (userId) => (dispatch) =>
	SongApiUtil.fetchLikedSongs(userId).then((data) =>
		dispatch(recieveLikedSongs(data))
	);

export const likeSong = (userId, songId) => (dispatch) =>
	SongApiUtil.likeSong(userId, songId).then((data) =>
		dispatch(recieveLikedSongs(data))
	);

export const unlikeSong = (userId, Id) => (dispatch) =>
	SongApiUtil.unlikeSong(userId, Id).then((data) =>
		dispatch(recieveLikedSongs(data))
	);
