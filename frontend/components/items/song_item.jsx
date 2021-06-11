import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { pauseSong, playSong } from '../../actions/currently_playing';
import { fetchAllSongs } from '../../actions/song_actions';
import { fetchAlbums } from '../../actions/album_actions';
import { fetchArtists } from '../../actions/artist_actions';

class SongItem extends Component {
	constructor(props) {
		super(props);
		const song = this.props.song;
		this.state = {
			song,
			audio: new Audio(song.url),
		};

		this.state.audio.preload = 'auto';
		this.state.audio.controls = true;
		this.togglePlay = this.togglePlay.bind(this);
	}

	
	componentDidMount() {
		this.props.fetchAlbums();
		this.props.fetchArtists()
		// this.props.fetchAllSongs();
		// 	this.props.fetchArtist(this.state.artist_id)
	}

	togglePlay() {
		if (this.state.audio.paused && !this.props.isPlaying) {
			this.props.playSong(this.state.song, this.state.audio);
		} else {
			this.props.pauseSong(this.state.audio);
		}
	}

	render() {
		let highlighted = '';
		if (this.props.currentlyPlayingSong && this.props.currentlyPlayingSong.id === this.state.song.id) {highlighted = 'now-playing'};
		let albumCover = 'no album cover'
		let albumName = 'no album name'
		if (this.props.album) {
			albumCover = this.props.album.url
			albumName = this.props.album.name
		}

		return (
			<li onClick={this.togglePlay} className={`${highlighted}`}>
				<h4 className='song-number' >
					{(!this.props.isPlaying || this.props.currentlyPlayingSong.id !== this.state.song.id) ? (
						this.props.number
					) : (
						<img
							width='14'
							height='14'
							src='https://open.scdn.co/cdn/images/equaliser-animated-green.73b73928.gif'></img>
					)}
				</h4>
				<h4><img className='album-cover' src={albumCover} alt="album" /></h4>
				<h4>{this.state.song.title}</h4>
				<h4 className='album-name'>{albumName}</h4>
				<h4 className='duration'>
				</h4>
			</li>
		);
	}
}

const mSTP = (state, ownProps) => {
	return {
		currentUser: state.entities.user[state.session.currentUser],
		number: ownProps.number,
		isPlaying: state.ui.currentlyPlaying.isPlaying,
		currentlyPlayingSong: state.ui.currentlyPlaying.song,
		album: state.entities.albums[ownProps.song.album_id]
	};
};

const mDTP = (dispatch) => ({
	fetchAlbums: () => dispatch(fetchAlbums()),
	fetchArtists: () => dispatch(fetchArtists()),
	fetchAllSongs: () => dispatch(fetchAllSongs()),
	playSong: (song, audio) => dispatch(playSong(song, audio)),
	pauseSong: (audio) => dispatch(pauseSong(audio)),
});

export default withRouter(connect(mSTP, mDTP)(SongItem));
