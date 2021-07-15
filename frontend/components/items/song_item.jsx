import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { pauseSong, playSong } from '../../actions/currently_playing';
import { fetchAllSongs } from '../../actions/song_actions';
import { fetchAlbums } from '../../actions/album_actions';
import { fetchArtists } from '../../actions/artist_actions';
import { formatTime } from '../../util/format_time';

class SongItem extends Component {
	constructor(props) {
		super(props);
		const song = this.props.song;
		const audio = new Audio(song.url);
		this.state = {
			song,
			audio,
		};

		this.state.audio.preload = 'auto';
		this.state.audio.controls = true;
		this.state.audio.currentTime = this.props.currentTime;
		this.togglePlay = this.togglePlay.bind(this);
	}

	componentDidMount() {
		this.props.fetchAlbums();
		this.props.fetchArtists();
		// this.props.fetchAllSongs();
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.isPlaying !== nextProps.isPlaying) return true;
		return false;
	}

	toggleLike() {
		this.togglePlay();
		console.log('liked song');
	}

	togglePlay() {
		if (this.props.isPlaying) {
			this.props.pauseSong();
			if (this.props.currentlyPlayingSong.id !== this.state.song.id) {
				console.log('songs dont match')
				console.table(this.props.currentlyPlayingSong, this.state.song)
				this.props.playSong(this.state.song, this.state.audio, this.props.fromWhere);
			}
			return
		}

		this.props.playSong(this.state.song, this.state.audio, this.props.fromWhere);
	}

	render() {
		let highlighted = '';
		const { audio, song } = this.state;
		const duration = formatTime(`${audio.duration}`);

		if (
			this.props.currentlyPlayingSong &&
			this.props.currentlyPlayingSong.id === song.id
		) {
			highlighted = 'now-playing';
		}
		let albumCover = 'no album cover';
		let albumName = 'no album name';

		if (this.props.album) {
			albumCover = this.props.album.url;
			albumName = this.props.album.name;
		}

		return (
			<li onClick={() => this.togglePlay()} className={`${highlighted}`}>
				<h4 className='song-number'>
					{!this.props.isPlaying ||
					this.props.currentlyPlayingSong.id !== song.id ? (
						<div>{this.props.number}</div>
					) : (
						<img
							width='14'
							height='14'
							src='https://open.scdn.co/cdn/images/equaliser-animated-green.73b73928.gif'></img>
					)}
				</h4>
				<h4>
					<img className='album-cover' src={albumCover} alt='album' />
				</h4>
				<h4>
					<div id='song-item-title'>{song.title}</div>
					<div id='song-item-artist'>
						{this.props.artist ? this.props.artist.name : ''}
					</div>
				</h4>
				<h4 className='album-name'>{albumName}</h4>
				<svg
					role='img'
					height='16'
					width='16'
					viewBox='0 0 16 16'
					className='like-song-btn'
					onClick={() => this.toggleLike()}>
					<path fill='none' d='M0 0h16v16H0z'></path>
					<path d='M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z'></path>
				</svg>
				<h4 className='duration'>{duration}</h4>
			</li>
		);
	}
}

const mSTP = ({ entities, ui, session }, ownProps) => {
	return {
		currentUser: entities.user[session.currentUser],
		number: ownProps.number,
		isPlaying: ui.currentlyPlaying.isPlaying,
		currentlyPlayingSong: ui.currentlyPlaying.song,
		currentlyPlayingAudio: ui.currentlyPlaying.audio,
		album: entities.albums[ownProps.song.album_id],
		artist: entities.artists[ownProps.song.artist_id],
		currentTime: ui.currentlyPlaying.currentTime,
		fromWhere: ownProps.fromWhere,
	};
};

const mDTP = (dispatch) => ({
	fetchAlbums: () => dispatch(fetchAlbums()),
	fetchArtists: () => dispatch(fetchArtists()),
	fetchAllSongs: () => dispatch(fetchAllSongs()),
	playSong: (song, audio, fromWhere) => dispatch(playSong(song, audio, fromWhere)),
	pauseSong: () => dispatch(pauseSong()),
});

export default withRouter(connect(mSTP, mDTP)(SongItem));
