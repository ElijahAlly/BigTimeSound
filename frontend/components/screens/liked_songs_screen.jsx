import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SongItem from '../items/song_items/song_item';
import SongListHeader from '../items/song_list_header';
import { handleColorShift } from '../../util/general_functions/header_color_switch';
import { assignImagesToSongs } from '../../util/general_functions/assign_functions';
import { receiveSongQueue } from '../../actions/song/song_queue_actions';
import { clearSearchResults } from '../../actions/search_actions';
import { pauseSong, playSong } from '../../actions/song/currently_playing';
import { fetchLikedSongs } from '../../actions/song/song_actions';
import SearchBar from '../items/search_items/search_bar';
import ListWithPicture from '../items/song_items/list_with_picture';
import PlaylistPlayButton from '../items/playlist_play_button';

class LikedSongsScreen extends Component {
	constructor(props) {
		super(props)
		this.togglePlay = this.togglePlay.bind(this)
	}
	
	componentDidMount() {
		this.props.fetchLikedSongs(this.props.currentUser.id);
		window.scrollTo(0, 0);
		handleColorShift('#5038a0');
		const main = document.getElementById('main');
		main.style.background =
			'linear-gradient(360deg, #121213 65%, rgb(80, 56, 160) 77%)';
	}

	shouldComponentUpdate(nextProps) {
		if (
			nextProps.volume !== this.props.volume ||
			nextProps.likedSongs !== this.props.likedSongs ||
			nextProps.searchedSongs !== this.props.searchedSongs ||
			nextProps.isPlaying !== this.props.isPlaying
		)
			return true;
		return false;
	}

	componentWillUnmount() {
		this.props.clearSearchResults(); // clear from playlist show and liked songs **not search screen
	}

	togglePlay() {
		let {
			playingFrom,
			audio,
			song,
			isPlaying,
			pauseSong,
			currentTime,
			playSong,
			likedSongs,
			receiveSongQueue,
			volume,
		} = this.props;

		if (playingFrom === 'liked-songs') {
			if (isPlaying) {
				pauseSong();
				return;
			}

			if (!song) {
				let songs = likedSongs;
				song = songs.shift();
				audio = new Audio(song.url);
			}

			playSong(song, audio, playingFrom, currentTime, volume, audio.duration);
			return;
		}

		let songs = likedSongs;
		let playSongFirst = songs.shift();
		let newAudio = new Audio(playSongFirst.url);
		receiveSongQueue(songs);
		playSong(
			playSongFirst,
			newAudio,
			'liked-songs',
			currentTime,
			volume,
			newAudio.duration
		);
	}

	render() {
		const { isPlaying, currentUser, likedSongs, searchedSongs, likeSong } =
			this.props;

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
						<h3 className='liked-songs-users-name'>{currentUser.username}</h3>
					</div>
				</section>
				
				<PlaylistPlayButton togglePlay={this.togglePlay} fromWhere={'liked-songs'}/>
				<SongListHeader />
				<section>
					<ul className='song-list'>
						{likedSongs ? (
							likedSongs.map((song, i) => (
								<SongItem
									number={i + 1}
									key={i}
									song={song}
									songList={likedSongs}
									fromWhere='liked-songs'
								/>
							))
						) : (
							<li>No Songs</li>
						)}
					</ul>
				</section>

				<section className='search'>
					<h1>Let's find something for your playlist</h1>
					<div className='playlist-search'>
						<SearchBar placeholder={'Search for songs'} />
					</div>
					{searchedSongs.length > 0 ? (
						<section className='songs-container'>
							<ListWithPicture
								songs={searchedSongs}
								shouldSlice={false}
								likedSongs={likedSongs}
								likeSong={likeSong}
								inLikedSongs={true}
							/>
						</section>
					) : (
						<></>
					)}
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
		searchedSongs: assignImagesToSongs(
			ui.search.results.songs,
			entities.albums
		),
	};
};

const mDTP = (dispatch) => ({
	fetchLikedSongs: (userId) => dispatch(fetchLikedSongs(userId)),
	receiveSongQueue: (songs) => dispatch(receiveSongQueue(songs)),
	likeSong: (userId, songId) => dispatch(likeSong(userId, songId)),
	pauseSong: () => dispatch(pauseSong()),
	clearSearchResults: () => dispatch(clearSearchResults()),
	playSong: (song, audio, playingFrom, currentTime, volume, duration) =>
		dispatch(playSong(song, audio, playingFrom, currentTime, volume, duration)),
});

export default withRouter(connect(mSTP, mDTP)(LikedSongsScreen));
