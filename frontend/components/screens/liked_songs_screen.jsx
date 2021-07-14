import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchLikedSongs } from '../../actions/song_actions';
import SongItem from '../items/song_item';
import SongListHeader from '../items/song_list_header';
import { handleColorShift } from '../../util/header_color_switch';
import { receiveSongQueue } from '../../actions/song_queue_actions';

class LikedSongsScreen extends Component {
	componentDidMount() {
		this.props.fetchLikedSongs(this.props.currentUser.id);
		window.scrollTo(0, 0);
		handleColorShift('#5038a0');
		const main = document.getElementById('main');
		main.style.background = 'linear-gradient(360deg, #121213 65%, rgb(80, 56, 160) 77%)';
	}

	togglePlay() {
		if (this.props.playingFrom === 'liked-songs') {
			if (this.props.isPlaying) {
				this.props.audio.pause();
				return
			}

			this.props.audio.play();
			return
		}

		const songs = this.props.likedSongs;
		const playSongFirst = songs.shift();
		const audio = new Audio(playSongFirst.url)
		
		this.props.receiveSongQueue(songs)
		this.props.playSong(playSongFirst, audio)
	}
	
	render() {
		let togglePlayButton = (
			<svg height='16' width='16' fill='currentColor' viewBox='0 0 16 16'>
				<path d='M4.018 14L14.41 8 4.018 2z'></path>
			</svg>
		);

		if (this.props.isPlaying) {
			togglePlayButton = (
				<svg height='16' width='16' viewBox='0 0 16 16'>
					<path fill='currentColor' d='M0 0h16v16H0z'></path>
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
					<h3 className='big-green-play-btn' onClick={() => this.togglePlay()}>
							{togglePlayButton}
					</h3>
				</section>
				<SongListHeader />
				<section>
					<ul className='song-list'>
						{this.props.likedSongs ? (
							this.props.likedSongs.map((song, i) => (
								<SongItem number={i + 1} key={song.id} song={song} fromWhere={}/>
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
		playingFrom: ui.queue.currentlyPlaying.playingFrom,
		isPlaying: ui.currentlyPlaying.isPlaying,
		audio: ui.currentlyPlaying.audio,
	};
};

const mDTP = (dispatch) => ({
	fetchLikedSongs: (userId) => dispatch(fetchLikedSongs(userId)),
	receiveSongQueue: (songs) => dispatch(receiveSongQueue(songs)),
});

export default withRouter(connect(mSTP, mDTP)(LikedSongsScreen));
