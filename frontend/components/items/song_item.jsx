import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
	pauseSong,
	playSong,
} from '../../actions/currently_playing';
import { setDuration } from '../../util/format_time';
import { receiveSongQueue } from '../../actions/song_queue_actions';
import {shuffleArray} from '../../util/shuffle_array'

class SongItem extends Component {
	constructor(props) {
		super(props);
		const song = this.props.song;
		const audio = new Audio(song.url);
		audio.preload = 'metadata';
		audio.controls = true;
		audio.currentTime = this.props.currentTime || 0;
		this.state = {
			song,
			audio,
		};

		this.togglePlay = this.togglePlay.bind(this);
	}

	componentDidMount() {
		setDuration(this.state.audio, this.state.song.id);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.props.isPlaying !== nextProps.isPlaying ||
			this.state.song !== nextState.song ||
			this.props.songList !== nextProps.songList ||
			this.props.volume !== nextProps.volume ||
			this.props.currentlyPlayingSong !== nextProps.currentlyPlayingSong ||
			this.props.shuffleIsOn !== nextProps.shuffleIsOn 
		)
			return true;
		return false;
	}

	toggleLike() {
		this.togglePlay();
		console.log('liked song');
	}

	togglePlay(songList) {
		const {
			isPlaying,
			pauseSong,
			currentlyPlayingSong,
			fromWhere,
			playSong,
			currentTime,
			volume,
			receiveSongQueue,
			shuffleIsOn
		} = this.props;

		const { song, audio } = this.state;
		
		if (isPlaying) {
			pauseSong();

			if (currentlyPlayingSong.id !== song.id) {
				playSong(song, audio, fromWhere, currentTime, volume, audio.duration);
			}
			
		} else {
			playSong(song, audio, fromWhere, currentTime, volume, audio.duration);
		}

		let shuffledQueue = [];
		let queue = [];
		songList.forEach((el) => {
			if (el.id !== song.id) shuffledQueue.push(el);
			if (!shuffleIsOn && (el.id === song.id || queue[0])) queue.push(el)
		})
		
		queue.shift();
		let queueToSend = queue;
		if (shuffleIsOn) queueToSend = shuffledQueue;
		receiveSongQueue(queueToSend)
	}

	render() {
		let highlighted = '';
		const { audio, song } = this.state;

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

		let {songList, shuffleIsOn} = this.props;
		if (shuffleIsOn && songList) songList = shuffleArray(songList);

		return (
			<li onClick={() => this.togglePlay(songList)} className={`${highlighted}`}>
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
				<h4 className='duration' id={`${song.id}`}>
					00:00
				</h4>
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
		volume: ui.currentlyPlaying.volume,
		shuffleIsOn: ui.currentlyPlaying.shuffleIsOn,
		fromWhere: ownProps.fromWhere,
	};
};

const mDTP = (dispatch) => ({
	receiveSongQueue: (queue) => dispatch(receiveSongQueue(queue)),
	playSong: (song, audio, fromWhere, currentTime, volume, duration) =>
		dispatch(playSong(song, audio, fromWhere, currentTime, volume, duration)),
	pauseSong: () => dispatch(pauseSong()),
});

export default withRouter(connect(mSTP, mDTP)(SongItem));
