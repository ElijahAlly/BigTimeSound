import * as SongApiUtil from '../util/song_api_util';

export const RECEIVE_ALL_SONGS = 'RECEIVE_ALL_SONGS';
export const CLEAR_ALL_SONGS = 'CLEAR_ALL_SONGS';
export const RECEIVE_SONG_ERRORS = 'RECEIVE_SONG_ERRORS';
export const CLEAR_SONG_ERRORS = 'CLEAR_SONG_ERRORS';

const receiveAllSongs = (songs) => ({
	type: RECEIVE_ALL_SONGS,
	songs,
});

const receiveSongErrors = (errors) => ({
	type: RECEIVE_SONG_ERRORS,
	errors,
});

export const clearAllSongs = () => ({
	type: CLEAR_ALL_SONGS,
});

export const clearSongErrors = () => ({
	type: CLEAR_SONG_ERRORS,
});



export const fetchAllSongs = () => (dispatch) =>
	SongApiUtil.fetchAllSongs().then(
		(songs) => dispatch(receiveAllSongs(songs)),
	);
