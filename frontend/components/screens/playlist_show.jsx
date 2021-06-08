import React, { Component } from 'react';
import SideNavBarContainer from '../user/side_nav_bar_container';
import SongPlaybackBar from '../user/song_playback_bar';
import UserHeaderContainer from '../user/user_header_container';
import PlaylistModalContainer from '../modals/playlist_modal_container'

class PlaylistShow extends Component {
	constructor(props) {
		super(props);
		console.log(props)
		this.playlist = this.props.playlists[parseInt(this.props.location.pathname.slice(-1))]
		const curUser = this.props.currentUser;
		this.state = {
			currentUser: curUser,
			clicked: 0,
		};
		this.closeDropdown = this.closeDropdown.bind(this);
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

	handleModalClick() {
		const modal = document.getElementById('outer-modal-div');

		if (modal && modal.className === 'closed') {
			modal.classList.remove('closed')
			modal.classList.add('open')
		} 
	}

	render() {
		return (
			<div onClick={this.closeDropdown}>
				<SideNavBarContainer
					currentUser={this.state.currentUser}
					logout={() => this.props.logout()}
					selected={'home'}
				/>
				<section className='main-show-page'>
					<UserHeaderContainer />
					<div id='outer-modal-div' className='closed'>
						<PlaylistModalContainer  playlist={this.playlist} />
					</div>
					<div className='playlist-show'>
						<section className='header'>
							<div>
								<svg
									height='48'
									width='48'
									fill='currentColor'
									viewBox='0 0 48 48'
									className='svg-headphones'
									onClick={this.handleModalClick}>
									<path d='M33.402 3.006L8.852 31.751l-2.337 12.61 12.09-4.281 24.552-28.746-9.755-8.328zM9.112 41.32l1.543-8.327 6.44 5.5-7.983 2.827zm9.418-4.231l-6.712-5.732L33.625 5.825l6.711 5.731L18.53 37.089z'></path>
								</svg>
							</div>
							<div className='title'>
								<h3>PLAYLIST</h3>
								<h1>{this.playlist.name}</h1>
								<h3 className='users-name'>
									{this.state.currentUser.username}
								</h3>
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
