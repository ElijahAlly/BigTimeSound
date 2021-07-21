import React, { Component } from 'react';
import { handleColorShift } from '../../util/header_color_switch';
import ListWithPicture from '../items/list_with_picture';
import SearchBar from '../items/search_bar';

class PlaylistShow extends Component {
	constructor(props) {
		super(props);
		const curUser = this.props.currentUser;
		const playlist =
			Object.values(this.props.playlist).length > 0
				? this.props.playlist
				: { name: '', user_id: null, id: null };
		this.state = {
			currentUser: curUser,
			playlist,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.selectOrCreatePlaylist = this.selectOrCreatePlaylist.bind(this);
		this.handleMoreInfoToggle = this.handleMoreInfoToggle.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.state.playlist !== nextState.playlist ||
			this.props.searchInput !== nextProps.searchInput ||
			this.props.location !== nextProps.location ||
			this.props.searchedSongs !== nextProps.searchedSongs
		) {
			return true;
		}
		return false;
	}

	componentWillUnmount() {
		this.props.clearSearch();
	}

	componentDidMount() {
		this.handleMoreInfoToggle();
		window.scrollTo(0, 0);
		this.selectOrCreatePlaylist();
		handleColorShift('#833b3f');
		const main = document.getElementById('main');
		main.style.background = '#833b3f';
	}

	selectOrCreatePlaylist() {
		this.props
			.fetchAllPlaylists(this.props.currentUser.id)
			.then(({ playlists }) => {
				const { location } = this.props;
				let isInPlaylists = false;
				let numForPlaylistName = null;
				let selectPlaylist;
				let temp = playlists.pop();
				playlists.unshift(temp);
				console.log('playlists', playlists);

				let length = playlists.length;
				playlists.forEach((playlist, i) => {
					console.log('playlist id: ', playlist.id);
					if (playlist.id === parseInt(location)) {
						isInPlaylists = true;
						selectPlaylist = playlist;
					}

					console.log('i: ', i);
					console.log('length - 1: ', length - 1);
					if (i === length - 1) {
						console.log(playlist, playlist.id + 1);
						numForPlaylistName = playlist.id + 1;
					}
				});

				if (playlists.length > 0 && isInPlaylists) {
					console.log('b4 set state', this.state);
					this.setState({
						playlist: selectPlaylist,
					});
					console.log('right after set state', this.state);
				} else {
					let numName = numForPlaylistName;
					let sorted = false;

					while (!sorted) {
						sorted = true;
						this.props
							.createPlaylist({
								name: `My Playlist #${numName}`,
								user_id: this.props.currentUser.id,
							})
							.then(({ playlist }) => {
								console.log(playlist);
								this.props.fetchAllPlaylists(playlist.user_id).then(() => {
									console.log('created!');
									sorted = false;
									this.props.history.push(`/users/${playlist.user_id}`);
									this.props.history.push(
										`/users/${playlist.user_id}/playlist/${playlist.id}`
									);
								});
							});
						numName = numName++;
					}
				}
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
				console.log(playlist);
				this.props.history.push(
					`/users/${playlist.user_id}/playlist/${playlist.id}`
				);
			});
	}

	deletePlaylist() {
		const homeButton = document.getElementsByClassName('home')[0];
		homeButton.classList.add('checked');
		this.props
			.deletePlaylist(this.props.currentUser.id, this.state.playlist.id)
			.then(() => {
				this.props.history.push(`/users/${this.props.currentUser.id}`);
			});
	}

	handleMoreInfoToggle() {
		const moreInfoPopout =
			document.getElementsByClassName('more-info-popout')[0];
		const moreInfoBtn = document.getElementById('more-info-btn');

		document.body.addEventListener('click', (e) => {
			if (
				(moreInfoPopout.style.display === 'none' ||
					moreInfoPopout.style.display === '') &&
				e.path[0] === moreInfoBtn
			) {
				moreInfoPopout.style.display = 'flex';
				return;
			}

			moreInfoPopout.style.display = 'none';
		});
	}

	render() {
		const {searchedSongs, openModal, deletePlaylist, likedSongs} = this.props;

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
									playlist: this.state.playlist,
								})
							}>
							<path d='M33.402 3.006L8.852 31.751l-2.337 12.61 12.09-4.281 24.552-28.746-9.755-8.328zM9.112 41.32l1.543-8.327 6.44 5.5-7.983 2.827zm9.418-4.231l-6.712-5.732L33.625 5.825l6.711 5.731L18.53 37.089z'></path>
						</svg>
					</div>
					<div className='title'>
						<h3>PLAYLIST</h3>
						<h1>{this.state.playlist.name}</h1>
						<h3 className='users-name'>{this.state.currentUser.username}</h3>
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
									playlist: this.state.playlist,
								})
							}>
							Edit Details
						</button>
						<button
							id='delete-playlist-btn'
							onClick={() => deletePlaylist()}>
							Delete Playlist
						</button>
					</div>
				</section>

				<section className='search'>
					<h1>Let's find something for your playlist</h1>
					{/* conditionally render search if no songs in playlist */}
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
