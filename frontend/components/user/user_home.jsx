import React, { Component } from 'react';
import SideNavBarContainer from './side_nav_bar_container';
import MainShowPageContainer from './main_show_page_container';
import SongPlaybackBar from './song_playback_bar';

class UserHome extends Component {
	constructor(props) {
		super(props);
		const cUser = this.props.currentUser;
		this.state = {
			currentUser: cUser,
			clicked: 0,
		};
	}


	render() {
		return (
			<div>
				<SideNavBarContainer
					currentUser={this.state.currentUser}
					logout={() => this.props.logout()}
					selected={'home'}
				/>
				<MainShowPageContainer path={this.props.match.path} />
				<SongPlaybackBar />
			</div>
		);
	}
}

export default UserHome;
