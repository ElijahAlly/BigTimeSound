import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sendCurrentTime} from '../../actions/currently_playing'
import {formatTime} from '../../util/format_time'

class ProgressBar extends Component {

    timeUpdate() {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const { duration, currentTime } = this.props.audio;
            this.props.sendCurrentTime(currentTime);
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }
    }

    componentDidMount() {
		if (this.props.audio && this.props.audio.duration) {

            this.timeUpdate();
            this.props.audio.addEventListener('timeupdate', () => this.timeUpdate());
            
            const progressContainer = document.getElementById('progress-bar-container');
            
			progressContainer.addEventListener('click', (e) => {
                const { duration } = this.props.audio;
				const width = progressContainer.clientWidth;
				const clickX = e.offsetX;
				this.props.audio.currentTime = (clickX / width) * duration;
			});
		}
	}

	shouldComponentUpdate(nextProps) {
		if (this.props !== nextProps) return true;
		return false;
	}

	render() {

        return (
            <section id='progress-info'>
                <h4 className='progress-time'>{formatTime(this.props.currentTime)}</h4>
                <div id='progress-bar-container'>
                    <div id='progress-bar'>
                        <div id='progress-bar-circle'></div>
                    </div>
                </div>
                <h4 className='progress-time'>{formatTime(this.props.audio.duration)}</h4>
            </section>
		);
	}
}

const mSTP = ({ ui }, ownProps) => ({
	audio: ui.currentlyPlaying.audio,
	isPlaying: ui.currentlyPlaying.isPlaying,
    currentTime: ui.currentlyPlaying.currentTime,
});

const mDTP = (dispatch) => ({
    sendCurrentTime: (currentTime) => dispatch(sendCurrentTime(currentTime))
})

export default connect(mSTP, mDTP)(ProgressBar);
