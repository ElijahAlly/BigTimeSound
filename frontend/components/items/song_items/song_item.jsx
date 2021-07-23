import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { pauseSong, playSong } from '../../../actions/song/currently_playing';
import { setDuration } from '../../../util/general_functions/format_time';
import { receiveSongQueue } from '../../../actions/song/song_queue_actions';
import { shuffleArray } from '../../../util/general_functions/shuffle_array';

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
			shuffleIsOn,
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
			if (!shuffleIsOn && (el.id === song.id || queue[0])) queue.push(el);
		});

		queue.shift();
		let queueToSend = queue;
		if (shuffleIsOn) queueToSend = shuffledQueue;
		receiveSongQueue(queueToSend);
	}

	render() {
		let highlighted = '';
		const { song } = this.state;
		let {
			album,
			number,
			artist,
			songList,
			isPlaying,
			fromWhere,
			likedSongs,
			shuffleIsOn,
			playingFrom,
			currentlyPlayingSong,
		} = this.props;

		if (
			currentlyPlayingSong &&
			currentlyPlayingSong.id === song.id &&
			playingFrom === fromWhere
		) {
			highlighted = 'now-playing';
		}

		let albumCover = 'no album cover';
		let albumName = 'no album name';

		if (album) {
			albumCover = album.url;
			albumName = album.name;
		}

		if (shuffleIsOn && songList) songList = shuffleArray(songList);

		let likedSongsIds = [];
		likedSongs && likedSongs.length > 0
			? likedSongs.map((likedSong) => likedSongsIds.push(likedSong.id))
			: null;

		return (
			<li
				onClick={() => this.togglePlay(songList)}
				className={`${highlighted}`}>
				<h4 className='song-number'>
					{isPlaying &&
					currentlyPlayingSong.id === song.id &&
					playingFrom === fromWhere ? (
						<img
							width='14px'
							height='14px'
							src='https://active-storage-big-time-sound-seeds.s3.amazonaws.com/ezgif.com-gif-maker+(2).gif'></img>
					) : (
						<div>{number}</div>
					)}
				</h4>
				<h4>
					<img className='album-cover' src={albumCover} alt='album' />
				</h4>
				<h4>
					<div id='song-item-title'>{song.title}</div>
					<div id='song-item-artist'>{artist ? artist.name : ''}</div>
				</h4>
				<h4 className='album-name'>{albumName}</h4>
				<div className='like-btn-container'>
					{likedSongsIds.includes(song.id) ? (
						<svg
							role='img'
							height='16'
							width='16'
							viewBox='0 0 16 16'
							className='like-song-btn'
							fill='currentColor'
							id='liked'>
							<path fill='none' d='M0 0h16v16H0z'></path>
							<path d='M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z'></path>
						</svg>
					) : (
						<svg
							role='img'
							height='16'
							width='16'
							viewBox='0 0 16 16'
							className='like-song-btn'
							fill='none'>
							<path fill='none' d='M0 0h16v16H0z'></path>
							<path
								id='not-liked'
								d='M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z'></path>
						</svg>
					)}
				</div>
				<h4 className='duration' id={`${song.id}`}>
					00:00
				</h4>
			</li>
		);
	}
}

const mSTP = ({ entities, ui, session }, ownProps) => {
	return {
		number: ownProps.number,
		fromWhere: ownProps.fromWhere,
		volume: ui.currentlyPlaying.volume,
		isPlaying: ui.currentlyPlaying.isPlaying,
		shuffleIsOn: ui.currentlyPlaying.shuffleIsOn,
		playingFrom: ui.currentlyPlaying.playingFrom,
		currentTime: ui.currentlyPlaying.currentTime,
		currentlyPlayingSong: ui.currentlyPlaying.song,
		album: entities.albums[ownProps.song.album_id],
		likedSongs: Object.values(entities.likedSongs),
		currentUser: entities.user[session.currentUser],
		currentlyPlayingAudio: ui.currentlyPlaying.audio,
		artist: entities.artists[ownProps.song.artist_id],
	};
};

const mDTP = (dispatch) => ({
	receiveSongQueue: (queue) => dispatch(receiveSongQueue(queue)),
	playSong: (song, audio, fromWhere, currentTime, volume, duration) =>
		dispatch(playSong(song, audio, fromWhere, currentTime, volume, duration)),
	pauseSong: () => dispatch(pauseSong()),
});

export default withRouter(connect(mSTP, mDTP)(SongItem));
