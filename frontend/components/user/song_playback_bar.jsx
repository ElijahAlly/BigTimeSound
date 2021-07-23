import React, { Component } from 'react';
import SongInfoPlaybackBar from '../items/playback_bar/song_info_playback_bar'
import SongControlsPlaybackBar from '../items/playback_bar/song_controls_playback_bar'
import VolumeControl from '../items/playback_bar/volume_control'

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
				<div className='volume-and-queue'>
					<VolumeControl />
				</div>
			</section>
		);
	}
}

export default SongPlaybackBar;
