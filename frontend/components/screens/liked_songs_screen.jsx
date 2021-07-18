import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SongItem from '../items/song_item';
import SongListHeader from '../items/song_list_header';
import { handleColorShift } from '../../util/header_color_switch';
import { receiveSongQueue } from '../../actions/song_queue_actions';
import { pauseSong, playSong } from '../../actions/currently_playing';
import { fetchLikedSongs } from '../../actions/song_actions';

class LikedSongsScreen extends Component {

	componentDidMount() {
		this.props.fetchLikedSongs(this.props.currentUser.id)
		window.scrollTo(0, 0);
		handleColorShift('#5038a0');
		const main = document.getElementById('main');
		main.style.background = 'linear-gradient(360deg, #121213 65%, rgb(80, 56, 160) 77%)';
	}

	togglePlay() {
		let {playingFrom, audio, song, isPlaying, pauseSong, currentTime, playSong, likedSongs, receiveSongQueue, volume} = this.props
		if (playingFrom === 'liked-songs') {
			if (isPlaying) {
				pauseSong();
				return
			}
			
			if (!song) {
				let songs = likedSongs;
				song = songs.shift();
				audio = new Audio(song.url)
			}

			playSong(song, audio, playingFrom, currentTime, volume, audio.duration);
			return
		}

		let songs = likedSongs;
		let playSongFirst = songs.shift();
		let newAudio = new Audio(playSongFirst.url)
		receiveSongQueue(songs)
		playSong(playSongFirst, newAudio, 'liked-songs', currentTime, volume, newAudio.duration)
	}

	shouldComponentUpdate(nextProps) {
        if (nextProps.volume !== this.props.volume || this.props.isPlaying !== nextProps.isPlaying) return true;
        return false;
    }

	render() {
		let togglePlayButton = (
			<svg height='16' width='16' fill='currentColor' viewBox='0 0 16 16' onClick={() => this.togglePlay()}>
				<path d='M4.018 14L14.41 8 4.018 2z'></path>
			</svg>
		);

		if (this.props.isPlaying) {
			togglePlayButton = (
				<svg height='16' width='16' viewBox='0 0 16 16' fill='currentColor' onClick={() => this.togglePlay()}>
					<path d='M3 2h3v12H3zm7 0h3v12h-3z'></path>
				</svg>
			);
		}

		return (
			<div className='screen liked-songs-screen'>
				<section className='liked-songs-header'>
					<div>
						<img
							className='liked-songs-image'
							src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'></img>
					</div>
					<div className='liked-songs-title'>
						<h3>PLAYLIST</h3>
						<h2>Liked Songs</h2>
						<h3 className='liked-songs-users-name'>
							{this.props.currentUser.username}
						</h3>
					</div>
				</section>
				<section className='big-green-play-btn-container'>
					<h3 className='big-green-play-btn'>
							{togglePlayButton}
					</h3>
				</section>
				<SongListHeader />
				<section>
					<ul className='song-list'>
						{this.props.likedSongs ? (
							this.props.likedSongs.reverse().map((song, i) => (
								<SongItem number={i + 1} key={i} song={song} fromWhere='liked-songs' />
							))
						) : (
							<li>No Songs</li>
						)}
					</ul>
				</section>
			</div>
		);
	}
}

const mSTP = ({ entities, session, ui }, ownProps) => {
	return {
		currentUser: entities.user[session.currentUser],
		playlists: entities.playlists,
		likedSongs: Object.values(entities.likedSongs),
		playingFrom: ui.currentlyPlaying.playingFrom,
		song: ui.currentlyPlaying.song,
		isPlaying: ui.currentlyPlaying.isPlaying,
		audio: ui.currentlyPlaying.audio,
		currentTime: ui.currentlyPlaying.currentTime,
		volume: ui.currentlyPlaying.volume,
	};
};

const mDTP = (dispatch) => ({
	fetchLikedSongs: (userId) => dispatch(fetchLikedSongs(userId)),
	receiveSongQueue: (songs) => dispatch(receiveSongQueue(songs)),
	pauseSong: () => dispatch(pauseSong()),
	playSong: (song, audio, playingFrom, currentTime, volume, duration) => dispatch(playSong(song, audio, playingFrom, currentTime, volume, duration)),
});

export default withRouter(connect(mSTP, mDTP)(LikedSongsScreen));
