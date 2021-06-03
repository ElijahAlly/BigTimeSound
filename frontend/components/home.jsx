import React from 'react';
import { Link, Redirect } from 'react-router-dom';

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
		this.props.login(demo).then((user) => <Redirect to={`/users/${user.id}`}/>);
	}

	render() {
		return (
			<>
				<header>
					<h1>
						<Link to='/'>
							<img
								src='https://user-images.githubusercontent.com/75961076/119849262-7b8e3f80-beda-11eb-9f78-f1b5312d08fd.png'
								alt='BigTimeSound Logo'
							/>
						</Link>
						BigTimeSound!
					</h1>
					<div className='header-buttons'>
						<button className="demo-user" onClick={this.handleDemo}>Demo User</button>
						<Link to='/signup'>
							<button>Sign Up</button>
						</Link>
						<Link to='/login'>
							<button>Log In</button>
						</Link>
					</div>
				</header>
			</>
		);
	}
}

export default Home;
