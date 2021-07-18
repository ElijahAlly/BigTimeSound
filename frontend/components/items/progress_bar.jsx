import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendCurrentTime } from '../../actions/currently_playing';
import { setDuration, formatTime } from '../../util/format_time';
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

	handleCurrentSongTime() {
		const { isPlaying, audio } = this.props;

		if (isPlaying && audio.controls) {
			let currentSongTime = document.getElementsByClassName('progress-time')[0];

            audio.addEventListener('timeupdate', _.throttle(() => {
				currentSongTime.innerHTML = formatTime(audio.currentTime);
				console.log(currentSongTime.innerHTML);
			}, 1000));
		}
	}

	changeTime(e) {
		const { duration } = this.props.audio;
		let currentTime = e.currentTarget.value;
		currentTime = currentTime * duration;
		this.props.audio.currentTime = currentTime;
		console.log('change time',currentTime);
		this.props.sendCurrentTime(currentTime);
	}

	shouldComponentUpdate(nextProps) {
		if (
			this.props.currentTime !== nextProps.currentTime ||
			this.props.isPlaying !== nextProps.isPlaying ||
			this.props.audio !== nextProps.audio ||
			this.props.currentlyPlayingSong !== nextProps.currentlyPlayingSong ||
			this.props.duration !== nextProps.duration
		)
			return true;
		return false;
	}

	componentDidUpdate() {
		
	}

	render() {
		let duration = 0;
		if (this.props.duration) duration = this.props.duration;

		const { currentTime, isPlaying, audio } = this.props;
		let progress = (currentTime / duration).toFixed(2) * 10;
		progress *= 1;

		if (currentTime === NaN || duration === 0) progress = 0;

		let currentSongTime = null;
		if (!isPlaying && audio) currentSongTime = formatTime(audio.currentTime);

		return (
			<section id='progress-info'>
				<h4 className='progress-time'>{currentSongTime ? currentSongTime : '00:00'}</h4>
				<input
					id='progress-control'
					value={progress}
					onChange={(e) => this.changeTime(e)}
					type='range'
					min='0'
					step='0.01'
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
    currentlyPlayingSong: ui.currentlyPlaying.song,
    duration: ui.currentlyPlaying.duration,
});

const mDTP = (dispatch) => ({
	sendCurrentTime: (currentTime) => dispatch(sendCurrentTime(currentTime)),
});

export default connect(mSTP, mDTP)(ProgressBar);
