import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	sendCurrentTime,
	sendCurrentProgress,
} from '../../../actions/song/currently_playing';
import { setDuration, formatTime } from '../../../util/general_functions/format_time';
var _ = require('lodash');

class ProgressBar extends Component {
	constructor(props) {
		super(props);
		this.changeTime = this.changeTime.bind(this);
		this.handleCurrentSongTime = this.handleCurrentSongTime.bind(this);
	}

	componentDidMount() {
		this.handleCurrentSongTime();
	}
	
	shouldComponentUpdate(nextProps) {
		if (
			this.props.song !== nextProps.song ||
			this.props.audio !== nextProps.audio ||
			this.props.duration !== nextProps.duration ||
			this.props.isPlaying !== nextProps.isPlaying ||
			this.props.currentTime !== nextProps.currentTime ||
			this.props.currentProgress !== nextProps.currentProgress
			) return true;
		return false;
	}

	componentDidUpdate() {
		this.handleCurrentSongTime();
	}

	handleCurrentSongTime() {
		const { isPlaying, audio, currentProgress } = this.props;
		let progressTrack = document.getElementById('progress-control');

		if (isPlaying && audio && audio.controls) {
			let currentSongTime = document.getElementsByClassName('progress-time')[0];

			audio.addEventListener(
				'timeupdate',
				_.throttle(() => {
					currentSongTime.innerHTML = formatTime(audio.currentTime);
					let currentPercent = `${audio.currentTime / audio.duration}`;
					currentPercent = currentPercent.slice(0, 5);
					sendCurrentProgress(currentPercent);
					progressTrack.value = currentPercent;
				}, 1000)
			);

			audio.addEventListener('pause', () => {
				let currentPercent = `${audio.currentTime / audio.duration}`;
				currentPercent = currentPercent.slice(0, 5);
				progressTrack.value = currentPercent;
			});
		} else {
			progressTrack.value = currentProgress;
		}
	}

	changeTime(e) {
		const { duration } = this.props.audio;
		let currentTime = e.currentTarget.value;
		let currentProgress = `${currentTime / duration}`.slice(0, 5);
		currentTime = currentTime * duration;
		this.props.audio.currentTime = currentTime;
		this.props.sendCurrentProgress(currentProgress);
	}

	render() {
		let duration = 0;
		if (this.props.duration) duration = this.props.duration;

		let { currentTime, isPlaying, audio, currentProgress } = this.props;

		if (currentTime === NaN || duration === 0) currentProgress = 0;

		let currentSongTime = null;
		if (isPlaying && audio) currentSongTime = formatTime(audio.currentTime);

		return (
			<section id='progress-info'>
				<h4 className='progress-time'>
					{currentSongTime ? currentSongTime : '00:00'}
				</h4>
				<input
					id='progress-control'
					value={currentProgress}
					onChange={(e) => this.changeTime(e)}
					type='range'
					min='0'
					step='0.001'
					max='1'
					fill='currentColor'
				/>
				<h4 className='progress-time'>{formatTime(duration)}</h4>
			</section>
		);
	}
}

const mSTP = ({ ui }, ownProps) => ({
	audio: ui.currentlyPlaying.audio,
	song: ui.currentlyPlaying.song,
	isPlaying: ui.currentlyPlaying.isPlaying,
	currentTime: ui.currentlyPlaying.currentTime,
	duration: ui.currentlyPlaying.duration,
	currentProgress: ui.currentlyPlaying.currentProgress,
});

const mDTP = (dispatch) => ({
	sendCurrentProgress: (currentProgress) =>
		dispatch(sendCurrentProgress(currentProgress)),
});

export default connect(mSTP, mDTP)(ProgressBar);
