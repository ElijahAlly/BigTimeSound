import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SideNavBar from './side_nav_bar';
import MainShowPage from './main_show_page';
import SongPlaybackBar from './song_playback_bar';

class UserHome extends Component {
	constructor(props) {
		super(props);
		const cUser = this.props.currentUser;
		this.state = {
			currentUser: cUser,
		};
		// console.log('user_home_component:', this.props);
	}

	render() {
		return (
			<>
				<div className='top-two-sections-user-show'>
					<SideNavBar
						currentUser={this.state.currentUser}
						logout={() => this.props.logout()}
					/>
					<MainShowPage />
				</div>
				<SongPlaybackBar />
			</>
		);
	}
}

export default UserHome;
