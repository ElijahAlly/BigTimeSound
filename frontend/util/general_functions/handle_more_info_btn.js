export const handleMoreInfoToggle = () => {
	const moreInfoPopout = document.getElementsByClassName('more-info-popout')[0];
	const moreInfoBtn = document.getElementById('more-info-btn');

	document.body.addEventListener('click', (e) => {
		if (
			(moreInfoPopout.style.display === 'none' ||
				moreInfoPopout.style.display === '') &&
			e.path[0] === moreInfoBtn
		) {
			moreInfoPopout.style.display = 'flex';
			return;
		}
		moreInfoPopout.style.display = 'none';
	});
};
