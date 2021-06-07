import React, { Component } from 'react';
import SideNavBarContainer from '../user/side_nav_bar_container';
import SongPlaybackBar from '../user/song_playback_bar';
import UserHeaderContainer from '../user/user_header_container';

class PlaylistShow extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
					<div>{this.props.playlist.name}</div>
				</section>
				<SongPlaybackBar />
			</div>
		)
	}
}

export default PlaylistShow;
