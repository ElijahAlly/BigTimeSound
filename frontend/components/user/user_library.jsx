import React, { Component } from 'react';
import SideNavBar from './side_nav_bar';
import MainShowPageContainer from './main_show_page_container';
import SongPlaybackBar from './song_playback_bar';

class UserLibrary extends Component {
	constructor(props) {
		super(props);
		const cUser = this.props.currentUser;
		this.state = {
			currentUser: cUser,
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
			<>
				<div className='user-library-page' onClick={this.closeDropdown}>
					<SideNavBar
						currentUser={this.state.currentUser}
						logout={() => this.props.logout()}
						selected={'library'}
					/>
					<MainShowPageContainer path={this.props.match.path}/>
				</div>
				<SongPlaybackBar />
			</>
		);
	}
}

export default UserLibrary;