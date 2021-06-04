import React from 'react';
import { Link } from 'react-router-dom';

class SideNavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: this.props.currentUser };
	}

	render() {
		const { user } = this.state;
		const { username, email } = user;

		return (
			<section className='side-nav-bar'>
				<h1 className='logo-cont'>
					<div id='picture-logo'>
						<img
							src='https://user-images.githubusercontent.com/75961076/119849262-7b8e3f80-beda-11eb-9f78-f1b5312d08fd.png'
							alt='BigTimeSound Logo'
						/>
					</div>
					<div className='app-name'>BigTimeSound!</div>
				</h1>
				<div className='place-holder'></div>
				<div className='album-cover'>
					<img src='https://blog.dozmia.com/content/images/2019/01/Portrait-The-Weeknd.jpg' />
				</div>
			</section>
		);
	}
}

export default SideNavBar;
