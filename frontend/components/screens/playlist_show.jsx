import React, { Component } from 'react';
import { handleColorShift } from '../../util/general_functions/header_color_switch';
import { handleMoreInfoToggle } from '../../util/general_functions/handle_more_info_btn';
import ListWithPicture from '../items/song_items/list_with_picture';
import PlaylistSongsList from '../items/song_items/playlist_songs_list';
import SearchBar from '../items/search_items/search_bar';
import PlaylistPlayButton from '../items/playlist_play_button';
import SongListHeader from '../items/song_list_header';
import { shuffleArray } from '../../util/general_functions/shuffle_array';
import { formatName } from '../../util/general_functions/format_name';
import {
	deletedPlaylist,
	displayMessage,
} from '../../util/general_functions/action_messages';
import { playlistPics } from '../../util/general_functions/playlist_pictures';

class PlaylistShow extends Component {
	constructor(props) {
		super(props);
		const { currentUser, playlist, location } = props;
		this.state = null;

		if (parseInt(location) >= 0) {
			this.state = {
				currentUser,
				playlist,
			};
		}

		this.createNewPlaylist = this.createNewPlaylist.bind(this);
		this.togglePlay = this.togglePlay.bind(this);
		this.toggleLike = this.toggleLike.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.state !== nextState ||
			this.props.searchInput !== nextProps.searchInput ||
			this.props.playlistIds !== nextProps.playlistIds ||
			this.props.likes !== nextProps.likes ||
			this.props.location !== nextProps.location ||
			this.props.searchedSongs !== nextProps.searchedSongs
		)
			return true;
		return false;
	}

	componentWillUnmount() {
		this.props.clearSearchResults(); // clear from playlist show and liked songs **not search screen
	}

	componentDidMount() {
		if (!parseInt(this.props.location)) {
			this.createNewPlaylist();
			return;
		}
		this.props.clearSearchResults();
		handleMoreInfoToggle();
		window.scrollTo(0, 0);
		handleColorShift('#763437');
		const main = document.getElementById('main');
		main.style.background = '#763437';
	}

	toggleLike(song) {
		const { likedSongsObj, currentUser, unlikeSong, likeSong, likes } =
			this.props;

		if (likedSongsObj[song.id]) {
			const likeId = likes[song.id].id;
			unlikeSong(currentUser.id, likeId);
			return;
		}

		likeSong(currentUser.id, song.id);
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
			playlistSongs,
			receiveSongQueue,
			volume,
			playlist,
			shuffleIsOn,
		} = this.props;

		if (isPlaying) {
			pauseSong();

			if (playingFrom === playlist.name) {
				return;
			}

			if (!song) {
				let songs = playlistSongs;
				if (shuffleIsOn) songs = shuffleArray(songs);
				song = songs.shift();
				audio = new Audio(song.url);
			}

			playSong(song, audio, playingFrom, currentTime, volume, audio.duration);
			return;
		}

		let songs = playlistSongs;
		let playSongFirst = songs.shift();
		let newAudio = new Audio(playSongFirst.url);
		receiveSongQueue(songs);
		playSong(
			playSongFirst,
			newAudio,
			playlist.name,
			currentTime,
			volume,
			newAudio.duration
		);
	}

	createNewPlaylist() {
		const {
			playlists,
			currentUser,
			createPlaylist,
			history,
			fetchAllPlaylists,
		} = this.props;

		let usersPlaylists = [];
		Object.values(playlists).forEach((playlist) => {
			if (playlist.user_id === currentUser.id) usersPlaylists.push(playlist);
		});

		const newPlaylistNumber = ++usersPlaylists.length;

		createPlaylist({
			name: `My Playlist #${newPlaylistNumber}`,
			user_id: currentUser.id,
		}).then(({ playlist }) => {
			fetchAllPlaylists(playlist.user_id).then(() => {
				history.push(`/users/${playlist.user_id}`);
				history.push(`/users/${playlist.user_id}/playlist/${playlist.id}`);
			});
		});
	}

	deletePlaylist() {
		const homeButton = document.getElementsByClassName('home')[0];
		homeButton.classList.add('checked');
		displayMessage(deletedPlaylist);
		this.props
			.deletePlaylist(this.props.currentUser.id, this.props.playlist.id)
			.then(() => {
				this.props.history.push(`/users/${this.props.currentUser.id}`);
			});
	}

	render() {
		const {
			searchedSongs,
			openModal,
			likedSongs,
			addSongToPlaylist,
			playlist,
			playlists,
			location,
			fetchAllPlaylistIds,
			history,
			songs,
		} = this.props;

		if (!parseInt(location)) return null;

		let { currentUser } = this.state;

		let imgSrc = '';
		Object.values(playlists).forEach((currentPlaylist, i) => {
			if (playlist.id === currentPlaylist.id) imgSrc = playlistPics[i];
		})

		return (
			<div className='screen playlist-show-screen'>
				<section className='header'>
					<div className='playlist-pics'>
						<img src={imgSrc} id='picture' />
						<svg
							fill='currentColor'
							viewBox='0 0 48 48'
							className='svg-pencil'
							onClick={() =>
								openModal('edit-playlist-modal', {
									...this.props,
									playlist,
								}, imgSrc)
							}>
							<path d='M33.402 3.006L8.852 31.751l-2.337 12.61 12.09-4.281 24.552-28.746-9.755-8.328zM9.112 41.32l1.543-8.327 6.44 5.5-7.983 2.827zm9.418-4.231l-6.712-5.732L33.625 5.825l6.711 5.731L18.53 37.089z'></path>
						</svg>
					</div>
					<div className='title'>
						<h3>PLAYLIST</h3>
						<h1>{playlist ? formatName(playlist.name, 100) : ''}</h1>
						<h3 className='users-name'>{currentUser.username}</h3>
					</div>
				</section>

				<section className='play-more-info-container'>
					<PlaylistPlayButton
						togglePlay={this.togglePlay}
						fromWhere={playlist ? playlist.name : ''}
					/>
					<section className='more-info'>
						<i className='fas fa-ellipsis-h' id='more-info-btn'></i>
						<div className='more-info-popout'>
							<button
								id='edit-playlist-btn'
								onClick={() =>
									openModal('edit-playlist-modal', {
										...this.props,
										playlist,
									})
								}>
								Edit Details
							</button>
							<button
								id='delete-playlist-btn'
								onClick={() => this.deletePlaylist()}>
								Delete Playlist
							</button>
						</div>
					</section>
				</section>
				<SongListHeader />

				<PlaylistSongsList
					key={playlist ? playlist.id : null}
					playlistName={playlist ? playlist.name : ''}
					playlistId={playlist ? playlist.id : ''}
				/>

				<section className='search'>
					<h1>Let's find something for your playlist</h1>
					<div className='playlist-search'>
						<SearchBar placeholder={'Search for songs'} />
					</div>
					{searchedSongs.length > 0 ? (
						<section className='songs-container'>
							<ListWithPicture
								toggleLike={this.toggleLike}
								history={history}
								inPlaylist={true}
								shouldSlice={false}
								songs={searchedSongs}
								userId={currentUser.id}
								likedSongs={likedSongs}
								addSongToPlaylist={addSongToPlaylist}
								fetchAllPlaylistIds={fetchAllPlaylistIds}
								playlistId={playlist ? playlist.id : null}
								songsInThisPlaylist={songs}
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

export default PlaylistShow;
