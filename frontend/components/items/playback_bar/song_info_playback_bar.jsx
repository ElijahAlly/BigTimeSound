import React, { Component } from 'react';
import { expandAlbumCover, fetchAlbums } from '../../../actions/album_actions';
import { connect } from 'react-redux';
import ArrowButton from '../arrow_button';
import { formatName } from '../../../util/general_functions/format_name';

class SongInfoPlaybackBar extends Component {
	// componentDidUpdate() {
	// 	if (!this.props.album) {
	// 		this.props.fetchAlbums();
	// 	}
	// }

	render() {
		let {album, isPlaying, albumIsCollapsed, song, artist, expandAlbumCover} = this.props;
        let albumCover = 'http://tny.im/no-cover-art';
		if (album) albumCover = album.url;

		let artistName = 'no artist name';
		if (artist) artistName = artist.name;

		let songTitle = 'no song playing';
		if (isPlaying || song)
			songTitle = song.title;
		return (
			<>
				{albumIsCollapsed ? (
					<>
						<ArrowButton classname={'expand-album-cover'} action={expandAlbumCover}/>
						<img id='playback-bar-album-cover' src={albumCover} />
						</>
						) : (
							<>
					</>
				)}
                <div>
    				<h3 id='playback-bar-song-title'>{albumIsCollapsed ? formatName(songTitle, 22) : formatName(songTitle, 28)}</h3>
	    			<h5 id='playback-bar-artist-name'>{albumIsCollapsed ? formatName(artistName, 22) : formatName(artistName, 28)}</h5>
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
