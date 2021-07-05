import React, { Component } from 'react';

class PlaylistShow extends Component {
	constructor(props) {
		super(props);
		// console.log('playlist-show props', this.props)
		const curUser = this.props.currentUser;
		const playlist = Object.values(this.props.playlist).length > 0 ? this.props.playlist : { name: `My Playlist #${this.props.location}`, user_id: null, id: null }
		this.state = {
			currentUser: curUser,
			playlist,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.selectOrCreatePlaylist = this.selectOrCreatePlaylist.bind(this);
	}

	shouldComponentUpdate(nextProps) {
		console.log('in should update');
		if (this.props.playlists !== nextProps.playlists) return true;
		console.log('returned false');
		return false;
	}

	componentDidMount() {
		this.selectOrCreatePlaylist();
	}

	selectOrCreatePlaylist({playlists}) {
		const { location } = this.props;
		console.log('playlists', this.props.playlists);
		// console.log('location', parseInt(location));
		let isInPlaylists = false;
		let selectPlaylist;
		playlists.forEach((playlist) => {
			if (playlist.id === parseInt(location)) {
				isInPlaylists = true;
				selectPlaylist = playlist;
			}
		})
		
		if (playlists.length > 0 && isInPlaylists) {
			console.log('in set state');
			this.setState({
				playlist: selectPlaylist,
			});
		} else {
			this.props
			.createPlaylist({
				name: `My Playlist #${location}`,
				user_id: this.props.currentUser.id,
			})
			.then(({ playlist }) => {
				this.props.fetchAllPlaylists(playlist.user_id)
				.then(() => {
					this.props.history.push(`/users/${playlist.user_id}/playlist/${playlist.id}`)
				})
			})
		}
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props.updatePlaylist({
			name: this.state.playlist.name,
			user_id: this.state.playlist.user_id,
		})
		.then((playlist) => {
			console.log(playlist)
			this.props.history.push(`/users/${playlist.user_id}/playlist/${playlist.id}`)
		});
	}
	
	deletePlaylist() {
		console.log(this.props.currentUser);
		console.log(this.state.playlist);
		const homeButton = document.getElementsByClassName('home')[0];
		homeButton.classList.add('checked');
		this.props.deletePlaylist(
				this.props.currentUser.id,
				this.state.playlist.id
			).then(() => {
				this.props.history.push(`/users/${this.props.currentUser.id}`)
			})
	}

	render() {
		return (
			<div className='playlist-show-screen'>
				<section className='header'>
					<div>
						<svg
							height='48'
							width='48'
							fill='currentColor'
							viewBox='0 0 48 48'
							className='svg-pencil'
							onClick={() =>
								this.props.openModal('edit-playlist-modal', {...this.props, playlist: this.state.playlist})
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
					<button
						onClick={() => this.deletePlaylist()}>
						Delete Playlist
					</button>
				</section>
				<section className='search'>
					<h1>Let's find something for your playlist</h1>
				</section>
			</div>
		);
	}
}

export default PlaylistShow;
