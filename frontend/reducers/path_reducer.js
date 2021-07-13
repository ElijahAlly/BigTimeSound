import { ADD_PATH } from '../actions/path_actions';

export default function pathReducer(state = [], action) {
	Object.freeze(state);
    let newState = [...state];
	console.log(newState)
	switch (action.type) {
		case ADD_PATH:
			if (action.path === newState[newState.length-1]) return state;
            if (newState.length === 12) newState.shift();
            newState.push(action.path)

			return newState;
		default:
			return state;
	}
}
