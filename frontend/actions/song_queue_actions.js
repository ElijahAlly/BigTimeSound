export const RECEIVE_SONG_QUEUE = 'RECEIVE_SONG_QUEUE'
export const ADD_SONG_TO_QUEUE = 'ADD_SONG_TO_QUEUE'
export const ADD_SONG_TO_QUEUE_HISTORY = 'ADD_SONG_TO_QUEUE_HISTORY'

export const receiveSongQueue = (songs) => ({
	type: RECEIVE_SONG_QUEUE,
	songs,
});

export const addSongToQueue = (song) => ({
	type: RECEIVE_SONG_QUEUE,
	song,
});

export const addSongToQueueHistory = (song) => ({
	type: ADD_SONG_TO_QUEUE_HISTORY,
	song,
});

