import React, { Component } from 'react';

class SongPlaybackBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<section className='song-playback-bar'>
				<div className='blue'></div>
				<div className='red'></div>
				<div className='green'></div>
			</section>
		);
	}
}

export default SongPlaybackBar;
