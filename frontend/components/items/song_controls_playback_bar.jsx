import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pauseSong, playSong } from '../../actions/currently_playing';
import ProgressBar from './progress_bar.jsx'

class SongControlsPlaybackBar extends Component {

    constructor(props) {
        super(props)

		this.togglePlay = this.togglePlay.bind(this);
    }

    togglePlay() {
		if (!this.props.isPlaying && this.props.song) {
			this.props.playSong(this.props.song, this.props.audio);
		} else if (this.props.song) {
			this.props.pauseSong(this.props.audio);
		}
	}

	render() {
		let togglePlayButton = (
			<svg height='16' width='16' viewBox='0 0 16 16'>
				<path d='M4.018 14L14.41 8 4.018 2z'></path>
			</svg>
		);

		if (this.props.isPlaying) {
			togglePlayButton = (
				<svg height='16' width='16' viewBox='0 0 16 16'>
					<path fill='none' d='M0 0h16v16H0z'></path>
					<path d='M3 2h3v12H3zm7 0h3v12h-3z'></path>
				</svg>
			);
        }

		return (
			<>
				<h3 className='play-pause' onClick={() => this.togglePlay()}>{togglePlayButton}</h3>
				<ProgressBar key={Math.random()}/>
			</>
		);
	}
}

const mSTP = (state, ownProps) => {
	return {
		isPlaying: state.ui.currentlyPlaying.isPlaying,
		song: state.ui.currentlyPlaying.song,
		audio: state.ui.currentlyPlaying.audio,
	};
};

const mDTP = (dispatch) => ({
    playSong: (song, audio) => dispatch(playSong(song, audio)),
	pauseSong: (audio) => dispatch(pauseSong(audio)),
});

export default connect(mSTP, mDTP)(SongControlsPlaybackBar);
