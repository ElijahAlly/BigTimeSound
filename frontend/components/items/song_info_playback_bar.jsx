import React, { Component } from 'react';
import { expandAlbumCover } from '../../actions/album_actions';
import { connect } from 'react-redux';

class SongInfoPlaybackBar extends Component {
	componentDidUpdate() {
		if (!this.props.album) {
			this.props.fetchAlbums();
		}
	}

	render() {
        let albumCover = 'http://tny.im/no-cover-art';
		if (this.props.album) albumCover = this.props.album.url;

		let artistName = 'no artist name';
		if (this.props.artist) artistName = this.props.artist.name;

		let songTitle = 'no song playing';
		if (this.props.isPlaying || this.props.song)
			songTitle = this.props.song.title;
		return (
			<>
				{this.props.albumIsCollapsed ? (
					<>
						<svg
							fill='currentColor'
							height='24'
							role='img'
							width='24'
							viewBox='0 0 24 24'
							className='expand-album-cover'
							onClick={() => this.props.expandAlbumCover()}>
							<polygon points='7.96,21.151 7.311,20.39 16.865,12.229 7.311,4.069 7.96,3.309 18.405,12.229 '></polygon>
						</svg>
						<img id='playback-bar-album-cover' src={albumCover} />
                    </>
				) : (
					<>
					</>
				)}
                <div>
    				<h3 id='playback-bar-song-title'>{songTitle}</h3>
	    			<h5 id='playback-bar-artist-name'>{artistName}</h5>
                </div>
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
	};
};

const mDTP = (dispatch) => ({
	fetchAlbums: () => dispatch(fetchAlbums()),
	expandAlbumCover: () => dispatch(expandAlbumCover()),
});

export default connect(mSTP, mDTP)(SongInfoPlaybackBar);
