import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pauseSong, playSong } from '../../actions/currently_playing';
import ProgressBar from './progress_bar.jsx';

class SongControlsPlaybackBar extends Component {
	constructor(props) {
		super(props);

		this.togglePlay = this.togglePlay.bind(this);
	}

	togglePlay() {
		if (!this.props.isPlaying && this.props.song) {
			this.props.playSong(this.props.song, this.props.audio, this.props.playingFrom);
		} else if (this.props.song) {
			this.props.pauseSong();
		}
	}

	render() {
		const {isPlaying} = this.props;

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

		const {songQueueHistory, songQueue} = this.props
		const nextSong = songQueue[0];
		const prevSong = songQueueHistory[songQueueHistory.length-1];

		const nextOrPrevSong = {
			isPlaying,
			song: null
		}

		return (
			<>
				<div className='controls-btns'>
					<svg
						fill='currentColor'
						role='img'
						height='16'
						width='16'
						viewBox='0 0 16 16'
						className='skip-prev-btn prev-track'
						onClick={() => this.props.skipTrack({...nextOrPrevSong, song: nextSong})}>
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
						onClick={() => this.props.prevTrack({...nextOrPrevSong, song: prevSong})}>
						<path d='M11 3v4.119L3 2.5v11l8-4.619V13h2V3z'></path>
					</svg>
				</div>
				<ProgressBar key={Math.random()} />
			</>
		);
	}
}

const mSTP = ({ui}, ownProps) => {
	return {
		isPlaying: ui.currentlyPlaying.isPlaying,
		song: ui.currentlyPlaying.song,
		audio: ui.currentlyPlaying.audio,
		songQueue: ui.queue.songQueue,
		songQueueHistory: ui.queue.songQueueHistory,
		playingFrom: ui.currentlyPlaying.playingFrom,
	};
};

const mDTP = (dispatch) => ({
	playSong: (song, audio, playingFrom) => dispatch(playSong(song, audio, playingFrom)),
	pauseSong: () => dispatch(pauseSong()),
});

export default connect(mSTP, mDTP)(SongControlsPlaybackBar);
