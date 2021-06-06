import React, { Component } from 'react';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		const date = new Date();

		const hrs = date.getHours();
		let greet;

		if (hrs >= 5 && hrs <= 11) {
			greet = 'morning';
		} else if (hrs >= 12 && hrs <= 17) {
			greet = 'afternoon';
		} else {
			greet = 'evening';
		}
		this.state = { greet };
	}

	render() {
		return (
			<div className='home-screen'>
				<h1>
					Good {this.state.greet}, {this.props.props.currentUser.username}
				</h1>
				<h2>home</h2>
			</div>
		);
	}
}

export default HomeScreen;
