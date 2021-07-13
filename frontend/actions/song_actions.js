import * as SongApiUtil from '../util/song_api_util';

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

const recieveLikedSongs = (songs) => ({
	type: RECEIVE_LIKED_SONGS,
	songs
});

export const fetchAllSongs = () => (dispatch) =>
	SongApiUtil.fetchAllSongs().then(
		(songs) => dispatch(receiveAllSongs(songs)),
	);

export const fetchLikedSongs = (userId) => (dispatch) =>
	SongApiUtil.fetchLikedSongs(userId).then(
		(songs) => dispatch(recieveLikedSongs(songs)),
	);

export const likeSong = (userId, songId) => (dispatch) =>
	SongApiUtil.likeSong(userId, songId).then(
		(songs) => dispatch(recieveLikedSongs(songs)),
	);

export const unlikeSong = (userId, songId) => (dispatch) =>
	SongApiUtil.unlikeSong(userId, songId).then(
		(songs) => dispatch(recieveLikedSongs(songs)),
	);
