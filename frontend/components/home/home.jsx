import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './header';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.handleDemo = this.handleDemo.bind(this);
	}

	handleDemo(e) {
		e.preventDefault();
		const demo = {
			username: 'Demo User',
			email: '',
			password: 'secretPasswordabcdefg0000',
		};
		this.props
			.login(demo)
			.then((user) => <Redirect to={`/users/${user.id}`} />);
	}

	render() {
		return (
			<>
				<Header />
				<div className='background'>
					<p>BIGTIMESOUND PREMIUM</p>
					<h1>Get 3 months of Premium for free</h1>
					<h4>
						Enjoy ad-free music, offline listening, and more. Cancel anytime.
					</h4>
					<Link to='/signup'>SIGN UP NOW</Link>
				</div>
			</>
		);
	}
}

export default Home;
