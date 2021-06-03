import React, { Component } from 'react';

class UserHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: this.props.currentUser,
		};
	}

	render() {
		return (
			<div className='user-home-page'>
				<h1>Hello {this.state.currentUser.username}!</h1>
				<button onClick={() => this.props.logout()}>Logout</button>
			</div>
		);
	}
}

export default UserHome;
