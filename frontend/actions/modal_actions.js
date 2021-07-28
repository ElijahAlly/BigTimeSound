export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, props = {}, imgSrc = null) => ({
	type: OPEN_MODAL,
	modal,
	props,
	imgSrc,
});

export const closeModal = () => ({
	type: CLOSE_MODAL,
});
