export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const CURRENT_TIME = 'CURRENT_TIME';

export const playSong = (song, audio, playingFrom) => ({
	type: PLAY_SONG,
    song,
	audio,
	playingFrom
});

export const pauseSong = () => ({
	type: PAUSE_SONG,
});

export const sendCurrentTime = (currentTime) => ({
	type: CURRENT_TIME,
	currentTime
});
