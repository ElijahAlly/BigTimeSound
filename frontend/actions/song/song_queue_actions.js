export const RECEIVE_SONG_QUEUE = 'RECEIVE_SONG_QUEUE';
export const ADD_SONG_TO_QUEUE_HISTORY = 'ADD_SONG_TO_QUEUE_HISTORY';
export const REMOVE_NEXT_FROM_QUEUE = 'REMOVE_NEXT_FROM_QUEUE';
export const REMOVE_LAST_FROM_QUEUE = 'REMOVE_LAST_FROM_QUEUE';
export const CLEAR_QUEUE = 'CLEAR_QUEUE';
export const ADD_TO_FRONT_QUEUE = 'ADD_TO_FRONT_QUEUE';

export const receiveSongQueue = (songs) => ({
	type: RECEIVE_SONG_QUEUE,
	songs,
});

export const clearQueueHistory = () => ({
	type: CLEAR_QUEUE,
});

export const addSongToQueueHistory = (song) => ({
	type: ADD_SONG_TO_QUEUE_HISTORY,
	song,
});

export const removeNextFromQueue = (song) => ({
	type: REMOVE_NEXT_FROM_QUEUE,
	song,
});

export const removeLastFromQueueHistory = () => ({
	type: REMOVE_LAST_FROM_QUEUE
});

export const addSongToFrontQueue = (song) => ({
	type: ADD_TO_FRONT_QUEUE,
	song
});

