export const PLAY_SONG = 'PLAY_SONG';
export const PAUSE_SONG = 'PAUSE_SONG';
export const CURRENT_TIME = 'CURRENT_TIME';
export const SEND_VOLUME = 'SEND_VOLUME';
export const SHUFFLE_ON = 'SHUFFLE_ON';
export const SHUFFLE_OFF = 'SHUFFLE_OFF';
export const TOGGLE_POPOUT = 'TOGGLE_POPOUT';
export const SEND_POPOUT_POS = 'SEND_POPOUT_POS';
export const TOGGLE_REPEAT_SONG = 'TOGGLE_REPEAT_SONG';
export const SEND_CURRENT_PROGRESS = 'SEND_CURRENT_PROGRESS';

export const playSong = (
	song,
	audio,
	playingFrom,
	currentTime,
	volume,
	duration
) => ({
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
	noAudio,
});

export const sendCurrentTime = (currentTime) => ({
	type: CURRENT_TIME,
	currentTime,
});

export const sendVolume = (volume) => ({
	type: SEND_VOLUME,
	volume,
});

export const toggleRepeatSong = (repeatSongOn) => ({
	type: TOGGLE_REPEAT_SONG,
	repeatSongOn,
});

export const sendCurrentProgress = (currentProgress) => ({
	type: SEND_CURRENT_PROGRESS,
	currentProgress,
});

export const turnShuffleOn = () => ({
	type: SHUFFLE_ON,
});

export const turnShuffleOff = () => ({
	type: SHUFFLE_OFF,
});

export const togglePopoutShowing = (popoutShowing) => ({
	type: TOGGLE_POPOUT,
	popoutShowing,
});

export const sendPopoutPosition = (popoutPosition) => ({
	type: SEND_POPOUT_POS,
	popoutPosition,
});
