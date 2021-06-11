import React, { Component } from 'react';
import SongInfoPlaybackBar from '../items/song_info_playback_bar'
import SongControlsPlaybackBar from '../items/song_controls_playback_bar'

class SongPlaybackBar extends Component {

	render() {
		return (
			<section className='song-playback-bar'>
				<div className='song-info'>
					<SongInfoPlaybackBar />
				</div>
				<div className='song-controls'>
					<SongControlsPlaybackBar />
				</div>
				<div className='green'></div>
			</section>
		);
	}
}

export default SongPlaybackBar;
