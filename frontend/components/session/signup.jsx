import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../home/header';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDemo = this.handleDemo.bind(this);
	}

	componentDidMount() {
		this.props.fetchAllSongs();
	}
	
	componentWillUnmount() {
		this.props.resetPathCounts()
		this.props.fetchAllSongs();
		this.props.clearErrors();
	}

	handleInput(type) {
		return (e) => this.setState({ [type]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props
			.createUser(this.state)
			.then((user) => <Redirect to={`/users/${user.id}`} />)
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
		const { errors } = this.props;
		return (
			<>
				<Header />
				<div id='bck-color'>
					<div className='signup-page'>
						<div className='register-methods'>
							<button className='demo-user' onClick={this.handleDemo}>
								Continue As A Demo User
							</button>
							<Link to='/login'>
								<button>Go to Login</button>
							</Link>
						</div>
						<div className='signup-or'>OR SIGNUP BELOW</div>
						<div className='signup-cont'>
							<form onSubmit={this.handleSubmit}>
								<label className='form-labels'>
									Username:
									<input
										type='text'
										value={this.state.username}
										onChange={this.handleInput('username')}
									/>
								</label>
								<label className='form-labels'>
									Email:
									<input
										type='text'
										value={this.state.email}
										onChange={this.handleInput('email')}
									/>
								</label>
								<label className='form-labels'>
									Password:
									<input
										type='password'
										value={this.state.password}
										onChange={this.handleInput('password')}
									/>
								</label>
								{errors.length > 0 ? (
									<h3 className='form-errors'>{errors[0]}</h3>
								) : (
									<h3 className='form-errors none'> </h3>
								)}
								<button>Sign Up</button>
							</form>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default SignUp;
