import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { addBackPath } from '../../actions/path_actions';
import {handleColorShift} from '../../util/header_color_switch'

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		const greet = this.greeting();
		this.state = { greet };
	}

	greeting() {
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

		return greet;
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		handleColorShift('#3f2657');
		const main = document.getElementById('main')
		main.style.background = '#3f2657';
	}


	render() {
		return (
			<div className='screen home-screen'>
				<h1>
					Good {this.state.greet}, {this.props.props.currentUser.username}
				</h1>
				<section className='suggested'>
					<div className='outer-div'>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`} onClick={() => this.props.addBackPath()}>
							<img
								height='100'
								width='100'
								src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
							/>
							<h2>Liked Songs</h2>
						</Link>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`} onClick={() => this.props.addBackPath()}>
							<img
								height='100'
								width='100'
								src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
							/>
							<h2>Chill</h2>
						</Link>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`} onClick={() => this.props.addBackPath()}>
							<img
								height='100'
								width='100'
								src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
							/>
							<h2>Dance</h2>
						</Link>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`} onClick={() => this.props.addBackPath()}>
							<img
								height='100'
								width='100'
								src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
							/>
							<h2>Grooves</h2>
						</Link>
					</div>
					<div className='outer-div'>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`} onClick={() => this.props.addBackPath()}>
							<img
								height='100'
								width='100'
								src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
							/>
							<h2>Sleep</h2>
						</Link>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`} onClick={() => this.props.addBackPath()}>
							<img
								height='100'
								width='100'
								src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
							/>
							<h2>HYPE</h2>
						</Link>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`} onClick={() => this.props.addBackPath()}>
							<img
								height='100'
								width='100'
								src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
							/>
							<h2>Your Daily Mix</h2>
						</Link>
						<Link to={`/users/${this.props.props.currentUser.id}/liked-songs`} onClick={() => this.props.addBackPath()}>
							<img
								height='100'
								width='100'
								src='https://misc.scdn.co/liked-songs/liked-songs-640.png'
							/>
							<h2>The Hits</h2>
						</Link>
					</div>
				</section>
			</div>
		);
	}
}

const mDTP = (dispatch) => ({
	addBackPath: () => dispatch(addBackPath())
})
export default withRouter(connect(null, mDTP)(HomeScreen));
