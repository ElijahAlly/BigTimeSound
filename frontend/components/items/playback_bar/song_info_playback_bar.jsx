import React, { Component } from 'react';
import { expandAlbumCover, fetchAlbums } from '../../../actions/album_actions';
import { togglePopoutShowing } from '../../../actions/song/currently_playing';
import { connect } from 'react-redux';
import ArrowButton from '../arrow_button';
import { formatName } from '../../../util/general_functions/format_name';

class SongInfoPlaybackBar extends Component {
	constructor(props) {
		super(props);

		this.popoutAlbum = this.popoutAlbum.bind(this);
	}

	popoutAlbum() {
		let {popoutShowing, togglePopoutShowing} = this.props;
		
		togglePopoutShowing(!popoutShowing)
	}

	render() {
		let { album, isPlaying, albumIsCollapsed, song, artist, expandAlbumCover } =
			this.props;
		let albumCover = 'https://active-storage-big-time-sound-seeds.s3.amazonaws.com/d3kxnbe-f16dabfb-0cf1-436c-9315-915fbe462f23.png';
		if (album) albumCover = album.url;

		let artistName = 'no artist name';
		if (artist) artistName = artist.name;

		let songTitle = 'no song playing';
		if (isPlaying || song) songTitle = song.title;
		return (
			<>
				{albumIsCollapsed ? (
					<>
						<ArrowButton
							classname={'expand-album-cover'}
							action={expandAlbumCover}
						/>
						<img id='playback-bar-album-cover' src={albumCover} />
					</>
				) : (
					<></>
				)}
				<div>
					<h3 id='playback-bar-song-title'>
						{albumIsCollapsed
							? formatName(songTitle, 22)
							: formatName(songTitle, 28)}
					</h3>
					<h5 id='playback-bar-artist-name'>
						{albumIsCollapsed
							? formatName(artistName, 22)
							: formatName(artistName, 28)}
					</h5>
				</div>
				<svg width='16' height='16' xmlns='http://www.w3.org/2000/svg' id='toggle-album-popout-btn' onClick={() => this.popoutAlbum()}>
					<g fill='currentColor' fillRule='evenodd'>
						<path
							d='M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z'
							fillRule='nonzero'></path>
						<path d='M10 8h4v3h-4z'></path>
					</g>
				</svg>
			</>
		);
	}
}

const mSTP = (state, ownProps) => {
	let artist_id = 0;
	let album_id = 0;
	let currentSong = state.ui.currentlyPlaying.song;
	if (currentSong) {
		artist_id = currentSong.artist_id;
		album_id = currentSong.album_id;
	}

	return {
		isPlaying: state.ui.currentlyPlaying.isPlaying,
		song: currentSong,
		artist: state.entities.artists[artist_id],
		album: state.entities.albums[album_id],
		albumIsCollapsed: state.ui.currentlyPlaying.albumIsCollapsed,
		popoutShowing: state.ui.currentlyPlaying.popoutShowing,
	};
};

const mDTP = (dispatch) => ({
	fetchAlbums: () => dispatch(fetchAlbums()),
	expandAlbumCover: () => dispatch(expandAlbumCover()),
	togglePopoutShowing: (popoutShowing) => dispatch(togglePopoutShowing(popoutShowing)),
});

export default connect(mSTP, mDTP)(SongInfoPlaybackBar);
