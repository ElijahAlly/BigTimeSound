import React, { Component } from 'react';
import SideNavBar from './side_nav_bar';
import MainShowPageContainer from './main_show_page_container';
import SongPlaybackBar from './song_playback_bar';

class Profile extends Component {
	constructor(props) {
		super(props);
		const cUser = this.props.currentUser;
		this.state = {
			currentUser: cUser,
		};
	}

	
	render() {
		return (
			<>
				<div>
					<SideNavBar
						currentUser={this.state.currentUser}
						logout={() => this.props.logout()}
					/>
					<MainShowPageContainer path={this.props.match.path}/>
				</div>
				<SongPlaybackBar />
			</>
		);
	}
}

export default Profile;
