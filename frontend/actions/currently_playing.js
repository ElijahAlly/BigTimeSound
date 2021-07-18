export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const CURRENT_TIME = 'CURRENT_TIME';
export const SEND_VOLUME = 'SEND_VOLUME';
export const SEND_CURRENT_PROGRESS = 'SEND_CURRENT_PROGRESS';

export const playSong = (song, audio, playingFrom, currentTime, volume, duration) => ({
	type: PLAY_SONG,
    song,
	audio,
	playingFrom,
	currentTime,
	volume,
	duration,
});

export const pauseSong = (noAudio = false) => ({
	type: PAUSE_SONG,
	noAudio
});

export const sendCurrentTime = (currentTime) => ({
	type: CURRENT_TIME,
	currentTime
})

export const sendVolume = (volume) => ({
	type: SEND_VOLUME,
	volume
});

export const sendCurrentProgress = (currentProgress) => ({
	type: SEND_CURRENT_PROGRESS,
	currentProgress
});
