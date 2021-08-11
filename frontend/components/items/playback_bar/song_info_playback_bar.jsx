import React, { Component } from 'react';
import { expandAlbumCover, fetchAlbums } from '../../../actions/album_actions';
import { connect } from 'react-redux';
import ArrowButton from '../arrow_button';
import { formatName } from '../../../util/general_functions/format_name';
import { withRouter } from 'react-router-dom';

class SongInfoPlaybackBar extends Component {

	render() {
		let { album, isPlaying, albumIsCollapsed, song, artist, expandAlbumCover, history, userId } =
			this.props;
		let albumCover =
			'https://active-storage-big-time-sound-seeds.s3.amazonaws.com/d3kxnbe-f16dabfb-0cf1-436c-9315-915fbe462f23.png';
		if (album) albumCover = album.url;

		let artistName = '';
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
					<h3 id='playback-bar-song-title' onClick={() => history.push(`/users/${userId}/album/${album.id}`)}>
						{albumIsCollapsed
							? formatName(songTitle, 19)
							: formatName(songTitle, 25)}
					</h3>
					<h5 id='playback-bar-artist-name' onClick={() => history.push(`/users/${userId}/artist/${artist.id}`)}>
						{albumIsCollapsed
							? formatName(artistName, 22)
							: formatName(artistName, 28)}
					</h5>
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
		userId: state.session.currentUser
	};
};

const mDTP = (dispatch) => ({
	fetchAlbums: () => dispatch(fetchAlbums()),
	expandAlbumCover: () => dispatch(expandAlbumCover()),
});

export default withRouter(connect(mSTP, mDTP)(SongInfoPlaybackBar));
