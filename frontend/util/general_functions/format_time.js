export const formatTime = (time) => {
	let mins = Math.floor(time / 60);
	mins = `${mins}`
	if (mins < 10) mins = `0${mins}`;

	let secs = Math.floor(time % 60);
	secs = `${secs}`
	if (secs < 10) secs = `0${secs}`;

	return `${mins}:${secs}`;
};

export const setDuration = (audio, id) => {
	const durationEle = document.getElementById(`${id}`);
	const playbackBarDuration = document.getElementsByClassName('progress-time')[1];

	audio.addEventListener('loadeddata', (e) => {
		const duration = formatTime(e.path[0].duration);
		durationEle.innerHTML = duration;
		playbackBarDuration.innerHTML = duration;
	});
};
