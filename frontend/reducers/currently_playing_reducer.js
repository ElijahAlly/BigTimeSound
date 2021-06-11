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
            action.audio.play()
            newState.audio = action.audio
            newState.song = action.song
            newState.isPlaying = true
            return newState;
        case PAUSE_SONG:
            action.audio.pause()
            newState.audio = action.audio
            newState.isPlaying = false;
            return newState;
        default:
            return state;
    }
}

export default currentlyPlayingReducer;