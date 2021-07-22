import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	pauseSong,
	playSong,
	turnShuffleOn,
	turnShuffleOff,
} from '../../actions/currently_playing';
import {
	removeNextFromQueue,
	addSongToQueueHistory,
	removeLastFromQueueHistory,
	addSongToFrontQueue,
} from '../../actions/song_queue_actions';
import ProgressBar from './progress_bar.jsx';

class SongControlsPlaybackBar extends Component {
	constructor(props) {
		super(props);

		this.togglePlay = this.togglePlay.bind(this);
		this.skipTrack = this.skipTrack.bind(this);
		this.prevTrack = this.prevTrack.bind(this);
		this.toggleShuffle = this.toggleShuffle.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		if (
			this.props.isPlaying !== nextProps.isPlaying ||
			this.props.currentTime !== nextProps.currentTime ||
			this.props.volume !== nextProps.volume ||
			this.props.shuffleIsOn !== nextProps.shuffleIsOn
		)
			return true;
		return false;
	}

	toggleShuffle() {
		const {shuffleIsOn, turnShuffleOff, turnShuffleOn} = this.props
		if (shuffleIsOn) {
			turnShuffleOff();
			return;
		}
		turnShuffleOn();
	}

	togglePlay() {
		const {
			isPlaying,
			song,
			audio,
			playingFrom,
			currentTime,
			playSong,
			volume,
			pauseSong,
		} = this.props;
		if (!isPlaying && song) {
			playSong(song, audio, playingFrom, currentTime, volume, audio.duration);
		} else if (song) {
			pauseSong();
		}
	}

	skipTrack(nextSong) {
		const {
			playingFrom,
			volume,
			pauseSong,
			isPlaying,
			song,
			playSong,
			addSongToQueueHistory,
			removeNextFromQueue,
		} = this.props;

		if (isPlaying) pauseSong();
		addSongToQueueHistory(song);
		playSong(nextSong, null, playingFrom, null, volume, null);
		removeNextFromQueue();
	}

	prevTrack(prevSong) {
		const {
			playingFrom,
			volume,
			pauseSong,
			isPlaying,
			playSong,
			removeLastFromQueueHistory,
			addSongToFrontQueue,
			song,
		} = this.props;

		if (isPlaying) pauseSong();
		removeLastFromQueueHistory();
		addSongToFrontQueue(song);
		playSong(prevSong, null, playingFrom, null, volume, null);
	}

	render() {
		const { songQueueHistory, songQueue, isPlaying, shuffleIsOn } = this.props;

		let togglePlayButton = (
			<svg height='16' width='16' viewBox='0 0 16 16'>
				<path d='M4.018 14L14.41 8 4.018 2z'></path>
			</svg>
		);

		if (isPlaying) {
			togglePlayButton = (
				<svg height='16' width='16' viewBox='0 0 16 16'>
					<path fill='none' d='M0 0h16v16H0z'></path>
					<path d='M3 2h3v12H3zm7 0h3v12h-3z'></path>
				</svg>
			);
		}

		const nextSong = songQueue[0];
		const prevSong = songQueueHistory[songQueueHistory.length - 1];

		let shuffle = '';
		if (shuffleIsOn) shuffle = 'shuffle-on';

		return (
			<>
				<div className='controls-btns'>
					<svg
						role='img'
						height='16'
						width='16'
						viewBox='0 0 16 16'
						className={`shuffle-btn ${shuffle}`}
						onClick={() => this.toggleShuffle()}
						fill='currentColor'>
						<path d='M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z'></path>
					</svg>
					<svg
						fill='currentColor'
						role='img'
						height='16'
						width='16'
						viewBox='0 0 16 16'
						className='skip-prev-btn prev-track'
						onClick={() => this.prevTrack(prevSong)}>
						<path d='M11 3v4.119L3 2.5v11l8-4.619V13h2V3z'></path>
					</svg>
					<h3 className='play-pause' onClick={() => this.togglePlay()}>
						{togglePlayButton}
					</h3>
					<svg
						fill='currentColor'
						role='img'
						height='16'
						width='16'
						viewBox='0 0 16 16'
						className='skip-prev-btn skip-track'
						onClick={() => this.skipTrack(nextSong)}>
						<path d='M11 3v4.119L3 2.5v11l8-4.619V13h2V3z'></path>
					</svg>
				</div>
				<ProgressBar key={Math.random()} />
			</>
		);
	}
}

const mSTP = ({ ui }, ownProps) => {
	return {
		isPlaying: ui.currentlyPlaying.isPlaying,
		song: ui.currentlyPlaying.song,
		audio: ui.currentlyPlaying.audio,
		songQueue: ui.queue.songQueue,
		songQueueHistory: ui.queue.songQueueHistory,
		playingFrom: ui.currentlyPlaying.playingFrom,
		currentTime: ui.currentlyPlaying.currentTime,
		shuffleIsOn: ui.currentlyPlaying.shuffleIsOn,
		volume: ui.currentlyPlaying.volume,
	};
};

const mDTP = (dispatch) => ({
	playSong: (song, audio, playingFrom, currentTime, volume, duration) =>
		dispatch(playSong(song, audio, playingFrom, currentTime, volume, duration)),
	pauseSong: () => dispatch(pauseSong()),
	addSongToQueueHistory: (song) => dispatch(addSongToQueueHistory(song)),
	removeLastFromQueueHistory: () => dispatch(removeLastFromQueueHistory()),
	addSongToFrontQueue: (song) => dispatch(addSongToFrontQueue(song)),
	removeNextFromQueue: () => dispatch(removeNextFromQueue()),
	turnShuffleOn: () => dispatch(turnShuffleOn()),
	turnShuffleOff: () => dispatch(turnShuffleOff()),
});

export default connect(mSTP, mDTP)(SongControlsPlaybackBar);
