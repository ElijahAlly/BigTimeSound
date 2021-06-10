import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

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
				<section className='suggested'>
					<div className='outer-div'>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`}>
							<img height='100' width='100' src="https://misc.scdn.co/liked-songs/liked-songs-640.png"/>
							<h2>Liked Songs</h2>
						</Link>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`}>
							<img height='100' width='100' src="https://misc.scdn.co/liked-songs/liked-songs-640.png"/>
							<h2>Flower Boy</h2>
						</Link>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`}>
							<img height='100' width='100' src="https://misc.scdn.co/liked-songs/liked-songs-640.png"/>
							<h2>Timbre</h2>
						</Link>
					</div>
					<div className='outer-div'>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`}>
							<img height='100' width='100' src="https://misc.scdn.co/liked-songs/liked-songs-640.png"/>
							<h2>Sleep</h2>
						</Link>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`}>
							<img height='100' width='100' src="https://misc.scdn.co/liked-songs/liked-songs-640.png"/>
							<h2>SLATT</h2>
						</Link>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`}>
							<img height='100' width='100' src="https://misc.scdn.co/liked-songs/liked-songs-640.png"/>
							<h2>Starboy</h2>
						</Link>
					</div>
				</section>
			</div>
		);
	}
}

export default HomeScreen;
