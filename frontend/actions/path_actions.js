export const ADD_BACK_PATH = 'ADD_BACK_PATH';
export const REMOVE_BACK_PATH = 'REMOVE_BACK_PATH';
export const ADD_FORWARD_PATH = 'ADD_FORWARD_PATH';
export const REMOVE_FORWARD_PATH = 'REMOVE_FORWARD_PATH';
export const RESET_PATH_COUNTS = 'RESET_PATH_COUNTS';

export const addBackPath = () => ({
	type: ADD_BACK_PATH,
});

export const removeBackPath = () => ({
	type: REMOVE_BACK_PATH,
});

export const addForwardPath = () => ({
	type: ADD_FORWARD_PATH,
});

export const removeForwardPath = () => ({
	type: REMOVE_FORWARD_PATH,
});

export const resetPathCounts = () => ({
	type: RESET_PATH_COUNTS,
});
