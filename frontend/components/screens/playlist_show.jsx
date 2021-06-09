import React, { Component } from 'react';
import SideNavBarContainer from '../user/side_nav_bar_container';
import SongPlaybackBar from '../user/song_playback_bar';
import UserHeaderContainer from '../user/user_header_container';
import PlaylistModalContainer from '../modals/playlist_modal_container';
import { Redirect } from 'react-router';

class PlaylistShow extends Component {
	constructor(props) {
		super(props);
		console.log(props);

		const curUser = this.props.currentUser;
		this.state = {
			currentUser: curUser,
			clicked: 0,
			playlist: { name: '', user_id: null, id: null },
			showModal: false,
		};

		this.closeDropdown = this.closeDropdown.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.fetchAllPlaylists(this.state.currentUser.id);
		const { playlists, location } = this.props;
		if (
			playlists &&
			playlists.length <= location
		) {
			this.setState({
				playlist: playlists[location],
			});
		} else if (playlists) {
			this.props
				.createPlaylist({
					name: `My Playlist #${location}`,
					user_id: this.props.currentUser.id,
				})
				.then((playlist) => (
					<Redirect to={`/users/${playlist.user_id}/playlist/${playlist.id}`} />
				));
		}
	}

	closeDropdown() {
		this.setState({ clicked: ++this.state.clicked });
		const dropdownEles = Array.from(document.getElementsByClassName('open'));
		if (this.state.clicked === 2 && dropdownEles) {
			dropdownEles.forEach((ele) => {
				ele.classList.remove('open');
				ele.classList.add('closed');
			});
			this.setState({ clicked: 0 });
		}
	}

	handleInput() {
		return (e) => this.setState({ name: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(this.props);
		console.log(this.state);
		this.props
			.updatePlaylist({
				name: this.state.playlist.name,
				user_id: this.state.playlist.user_id,
			})
			.then((playlist) => (
				<Redirect to={`/users/${playlist.user_id}/playlist/${playlist.id}`} />
			));
	}

	handleModalClick(action) {
		const modal = document.getElementById('modal');

		if (modal && action === 'modal-closed') {
			modal.classList.remove('modal-open');
			modal.classList.add('modal-closed');
		} else if (modal) {
			modal.classList.remove('modal-closed');
			modal.classList.add('modal-open');
		}
	}

	render() {
		return (
			<div onClick={this.closeDropdown} onClick={this.closeMoreInfo}>
				<SideNavBarContainer
					currentUser={this.state.currentUser}
					logout={() => this.props.logout()}
					selected={'home'}
				/>
				<section className='main-show-page msp-playlist-show'>
					<UserHeaderContainer />

					<div className='playlist-show'>
						<section className='header'>
							<div>
								<svg
									height='48'
									width='48'
									fill='currentColor'
									viewBox='0 0 48 48'
									className='svg-dots'
									onClick={() => this.handleModalClick('modal-open')}>
									<path d='M33.402 3.006L8.852 31.751l-2.337 12.61 12.09-4.281 24.552-28.746-9.755-8.328zM9.112 41.32l1.543-8.327 6.44 5.5-7.983 2.827zm9.418-4.231l-6.712-5.732L33.625 5.825l6.711 5.731L18.53 37.089z'></path>
								</svg>
							</div>
							<div className='title'>
								<h3>PLAYLIST</h3>
								<h1>{this.state.playlist.name}</h1>
								<h3 className='users-name'>
									{this.state.currentUser.username}
								</h3>
							</div>
						</section>
						<PlaylistModalContainer />
						<section className='more-info'>
							<svg
								fill='currentColor'
								height='32'
								width='32'
								viewBox='0 0 32 32'
								onClick={this.openMoreInfo}>
								<path d='M5.998 13.999A2 2 0 105.999 18a2 2 0 00-.001-4zm10.001 0A2 2 0 1016 18a2 2 0 000-4zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z'></path>
							</svg>
							<div id='more-info' className='more-info-closed'>
								<button
									onClick={() =>
										this.props.deletePlaylist(
											this.state.playlist.user_id,
											this.state.playlist.id
										)
									}>
									logout
								</button>
							</div>
						</section>
						<section className='search'>
							<h1>Let's find something for your playlist</h1>
						</section>
					</div>
				</section>
				<SongPlaybackBar />
			</div>
		);
	}
}

export default PlaylistShow;
