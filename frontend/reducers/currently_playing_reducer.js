import {PAUSE_SONG, PLAY_SONG} from '../actions/currently_playing';


const _InitialState = {
    song: null, 
    isPlaying: false,
    audio: null,
}

const currentlyPlayingReducer = (state = _InitialState, action) => {
    Object.freeze(state);
    const newState = Object.assign({}, state)

    switch (action.type) {
        case PLAY_SONG:
            if (state.isPlaying) state.audio.pause()
            if (action.audio.controls) { // true or undefined
                newState.audio = action.audio;
            } else {
                const audio = new Audio(action.song.url);
                audio.preload = 'auto';
                audio.controls = 'true';
                newState.audio = audio;
            }

            newState.song = action.song;
            newState.audio.play();
            newState.isPlaying = true;
            return newState;

        case PAUSE_SONG:
            newState.audio = action.audio;
            newState.audio.pause();
            newState.isPlaying = false;
            return newState;
            
        default:
            return state;
    }
}

export default currentlyPlayingReducer;