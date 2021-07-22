import React, { Component } from 'react';
import { handleColorShift } from '../../util/header_color_switch';
import { handleMoreInfoToggle } from '../../util/handle_more_info_btn';
import ListWithPicture from '../items/list_with_picture';
import PlaylistSongsList from '../items/playlist_songs_list';
import SearchBar from '../items/search_bar';
import SongListHeader from '../items/song_list_header';

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

			this.handleSubmit = this.handleSubmit.bind(this);
		}

		this.createNewPlaylist = this.createNewPlaylist.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.state !== nextState ||
			this.props.searchInput !== nextProps.searchInput ||
			this.props.location !== nextProps.location ||
			this.props.searchedSongs !== nextProps.searchedSongs
		) return true;
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
		handleColorShift('#833b3f');
		const main = document.getElementById('main');
		main.style.background = '#833b3f';
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

	handleSubmit(e) {
		e.preventDefault();

		this.props
			.updatePlaylist({
				name: this.state.playlist.name,
				user_id: this.state.playlist.user_id,
			})
			.then((playlist) => {
				this.props.history.push(
					`/users/${playlist.user_id}/playlist/${playlist.id}`
				);
			});
	}

	deletePlaylist() {
		const homeButton = document.getElementsByClassName('home')[0];
		homeButton.classList.add('checked');
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
			location,
		} = this.props;

		if (!parseInt(location)) return null;

		let { currentUser } = this.state;

		return (
			<div className='screen playlist-show-screen'>
				<section className='header'>
					<div>
						<svg
							height='48'
							width='48'
							fill='currentColor'
							viewBox='0 0 48 48'
							className='svg-pencil'
							onClick={() =>
								openModal('edit-playlist-modal', {
									...this.props,
									playlist,
								})
							}>
							<path d='M33.402 3.006L8.852 31.751l-2.337 12.61 12.09-4.281 24.552-28.746-9.755-8.328zM9.112 41.32l1.543-8.327 6.44 5.5-7.983 2.827zm9.418-4.231l-6.712-5.732L33.625 5.825l6.711 5.731L18.53 37.089z'></path>
						</svg>
					</div>
					<div className='title'>
						<h3>PLAYLIST</h3>
						<h1>{playlist.name}</h1>
						<h3 className='users-name'>{currentUser.username}</h3>
					</div>
				</section>

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

				<SongListHeader />
				<PlaylistSongsList
					playlistName={playlist.name}
					playlistId={playlist.id}
				/>

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
								inPlaylist={true}
								playlistId={playlist.id}
								addSongToPlaylist={addSongToPlaylist}
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
