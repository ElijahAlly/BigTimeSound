import React, { Component } from 'react';
import { expandAlbumCover, fetchAlbums } from '../../actions/album_actions';
import { connect } from 'react-redux';
import ArrowButton from '../items/arrow_button';

class SongInfoPlaybackBar extends Component {
	// componentDidUpdate() {
	// 	if (!this.props.album) {
	// 		this.props.fetchAlbums();
	// 	}
	// }

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
						<ArrowButton classname={'expand-album-cover'} action={this.props.expandAlbumCover}/>
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
