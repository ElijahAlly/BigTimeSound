import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class PlaylistShow extends Component {
	constructor(props) {
		super(props);
		console.log('playlist-show props', this.props)
		const curUser = this.props.currentUser;
		const playlist = this.props.playlist || { name: `My Playlist #${this.props.location}`, user_id: null, id: null }
		this.state = {
			currentUser: curUser,
			playlist,
		};
		console.log('playlist-show state', this.state)
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const { playlists, location } = this.props;
		let isInPlaylists = false;
		Object.values(playlists).forEach((playlist) => {
			if (playlist.id === parseInt(location)) isInPlaylists = true;
		})
		console.log('playlist-show mounted', this.props)

		if (playlists && isInPlaylists) {
			this.setState({
				playlist: playlists[location],
			});
		} else {
			this.props
				.createPlaylist({
					name: `My Playlist #${location}`,
					user_id: this.props.currentUser.id,
				})
				.then(({ playlist }) => {
					return this.props.history.push(
						`/users/${playlist.user_id}/playlist/${playlist.id}`
					);
				});
		}
	}

	handleSubmit(e) {
		e.preventDefault();

		this.props.updatePlaylist({
			name: this.state.playlist.name,
			user_id: this.state.playlist.user_id,
		});
		// .then((playlist) => (
		// 	<Redirect to={`/users/${playlist.user_id}/playlist/${playlist.id}`} />
		// ));
	}


	shouldComponentUpdate(prevProps) {
		if (this.props !== prevProps) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		console.log('rendering show', this.props)
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
								this.props.openModal('edit-playlist-modal', this.props)
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
						onClick={() =>
							this.props
								.deletePlaylist(
									this.props.currentUser.id,
									this.state.playlist.id
								)
								.then(() => (
									<Redirect to={`/users/${this.state.currentUser.id}`} />
								))
						}>
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
