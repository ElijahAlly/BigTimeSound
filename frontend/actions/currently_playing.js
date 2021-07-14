export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const CURRENT_TIME = 'CURRENT_TIME';

export const playSong = (song, audio) => ({
	type: PLAY_SONG,
    song,
	audio
});

export const pauseSong = (audio) => ({
	type: PAUSE_SONG,
	audio
});

export const sendCurrentTime = (currentTime) => ({
	type: CURRENT_TIME,
	currentTime
});
