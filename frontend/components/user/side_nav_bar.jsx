import React from 'react';
import { Link } from 'react-router-dom';
import CurrentlyPlayingAlbum from '../items/currently_playing_album';

class SideNavBar extends React.Component {
	constructor(props) {
		super(props);
		console.log('nav-bar props', this.props);
		this.state = {
			user: this.props.currentUser,
			selected: this.props.selected,
		};
	}

	componentDidMount() {
		this.props.fetchAllPlaylists(this.state.user.id);
		if (this.state.selected === 'search') {
			this.handleClass('search');
		} else if (this.state.selected === 'library') {
			this.handleClass('library');
		} else if (this.state.selected === 'home') {
			this.handleClass('home');
		} else if (this.state.selected === 'none') {
			this.handleClass('none');
		}
	}

	handleClass(type = 'none') {
		if (type === 'none') {
			type = 'no-element-has-this';
		}

		const element = document.getElementsByClassName(type)[0];
		const oldChecked = document.getElementsByClassName('checked')[0];
		if (oldChecked) {
			oldChecked.classList.remove('checked');
		}
		if (element) element.classList.add('checked');
	}

	shouldComponentUpdate(nextProps) {
		if (this.props !== nextProps || this.props.match.params.id != nextProps.match.params.id) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const { user, selected } = this.state;
		const { username, email, id } = user;
		let playlists;
		let playlistsLength;
		if (this.props.playlists) {
			playlists = Object.values(this.props.playlists);
			playlistsLength = playlists.length + 1;
		}

		return (
			<section className='side-nav-bar'>
				<div>
					<h1 className='logo-cont'>
						<div id='picture-logo'>
							<img
								src='https://user-images.githubusercontent.com/75961076/119849262-7b8e3f80-beda-11eb-9f78-f1b5312d08fd.png'
								alt='BigTimeSound Logo'
							/>
						</div>
						<div className='app-name'>BigTimeSound!</div>
					</h1>

					<section className='side-navigation-buttons'>
						<Link
							className='side home'
							to={`/users/${id}`}
							onClick={() => this.handleClass('home')}>
							<svg viewBox='0 0 512 512' width='24' height='24'>
								<path
									d='M 256.274 60.84 L 84.324 166.237 L 84.324 443.063 L 193.27 443.063 L 193.27 293.73 L 320.228 293.73 L 320.228 443.063 L 428.222 443.063 L 428.222 165.476 L 256.274 60.84 Z M 256.274 35.95 L 448.452 149.145 L 448.452 464.395 L 300 464.395 L 300 315.062 L 213.499 315.062 L 213.499 464.395 L 64.095 464.395 L 64.095 150.161 L 256.274 35.95 Z'
									fill='currentColor'></path>
							</svg>
							<div>Home</div>
						</Link>
						<Link
							className='side search'
							to={`/users/${id}/search`}
							onClick={() => this.handleClass('search')}>
							<svg viewBox='0 0 512 512' width='22' height='22'>
								<path
									d='M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z'
									fill='currentColor'></path>
							</svg>
							<div>Search</div>
						</Link>
						<Link
							className='side library'
							to={`/users/${id}/library`}
							onClick={() => this.handleClass('library')}>
							<svg viewBox='0 0 512 512' width='22' height='22'>
								<path
									d='M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z'
									fill='currentColor'></path>
							</svg>
							<div>Your Library</div>
						</Link>
						<Link
							className='side create-playlist'
							to={`/users/${id}/playlist/${playlistsLength}`}
							onClick={() => this.handleClass()}>
							<svg viewBox='0 0 16 16' fill='currentColor'>
								<path d='M14 7H9V2H7v5H2v2h5v5h2V9h5z'></path>
								<path fill='none' d='M0 0h16v16H0z'></path>
							</svg>
							<div>Create Playlist</div>
						</Link>
						<Link
							className='side liked-songs'
							to={`/users/${id}/liked-songs`}
							onClick={() => this.handleClass()}>
							<img
								fill='currentColor'
								src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
							/>
							<div>Liked Songs</div>
						</Link>
					</section>
					<div id='side-line-break'></div>
				</div>
				<section className='side-playlists'>
					{playlists ? (
						playlists.map((playlist) => {
							return (
								<h3
									key={playlist.id}
									onClick={() => {
										this.props.history.push(`/users/${id}/playlist/${playlist.id}`);
										this.handleClass('none')
									}}>
									{playlist.name}
								</h3>
							);
						})
					) : (
						<div>No Playlists</div>
					)}
				</section>
				<section className='album-cover'>
					<CurrentlyPlayingAlbum />
				</section>
			</section>
		);
	}
}

export default SideNavBar;
