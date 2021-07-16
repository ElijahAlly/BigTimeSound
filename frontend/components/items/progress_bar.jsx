import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sendCurrentTime} from '../../actions/currently_playing'
import {setDuration, formatTime} from '../../util/format_time'

class ProgressBar extends Component {
    constructor(props) {
        super(props)

        this.timeUpdate = this.timeUpdate.bind(this)
        this.handleProgress = this.handleProgress.bind(this)
    }

    timeUpdate() {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const { duration, currentTime } = this.props.audio;
            console.log(currentTime)
            this.props.sendCurrentTime(currentTime);
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }
    }

    handleProgress() {
        const {audio, song} = this.props
        const { duration } = audio;
        setDuration(audio, song.id)

        this.timeUpdate();
        console.log(audio)
        audio.addEventListener('timeupdate', () => this.timeUpdate());
        
        const progressContainer = document.getElementById('progress-bar-container');
        
        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            audio.currentTime = (clickX / width) * duration;
        });
    }

	shouldComponentUpdate(nextProps) {
		if (this.props.audio !== nextProps.audio) return true;
		return false;
	}

	render() {
        this.props.audio.controls ? this.handleProgress() : null;

        return (
            <section id='progress-info'>
                <h4 className='progress-time'>{formatTime(this.props.currentTime)}</h4>
                <div id='progress-bar-container'>
                    <div id='progress-bar'>
                        <div id='progress-bar-circle'></div>
                    </div>
                </div>
                <h4 className='progress-time'>00:00</h4>
            </section>
		);
	}
}

const mSTP = ({ ui }, ownProps) => ({
	audio: ui.currentlyPlaying.audio,
	song: ui.currentlyPlaying.song,
	isPlaying: ui.currentlyPlaying.isPlaying,
    currentTime: ui.currentlyPlaying.currentTime,
});

const mDTP = (dispatch) => ({
    sendCurrentTime: (currentTime) => dispatch(sendCurrentTime(currentTime))
})

export default connect(mSTP, mDTP)(ProgressBar);
