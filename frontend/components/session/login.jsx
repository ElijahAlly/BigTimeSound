import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../home/header';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginWith: 'Username',
			username: '',
			email: '',
			password: '',
			Selected: 'username',
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDemo = this.handleDemo.bind(this);
	}

	componentDidMount() {
		this.props.fetchAllSongs();
	}

	componentWillUnmount() {
		this.props.resetPathCounts()
		this.props.clearErrors();
	}

	handleInput(type) {
		return (e) => {
			this.setState({ [type]: e.target.value });
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props
			.login({
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
			})
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
		const { Selected } = this.state;
		let uSelected = '';
		let eSelected = '';
		if (Selected === 'username') {
			uSelected = Selected;
		} else {
			eSelected = Selected;
		}

		const { errors } = this.props;
		const loginType = this.state.loginWith.toLowerCase();
		return (
			<>
				<Header />
				<div id='bck-color'>
					<div className='login-page'>
						<div className='register-methods'>
							<button className='demo-user' onClick={this.handleDemo}>
								Continue As A Demo User
							</button>
							<Link to='/signup'>
								<button>Go to Sign Up</button>
							</Link>
						</div>
						<div className='signup-or'>OR LOG IN BELOW</div>
						<div className='login-cont'>
							<h2>Log in using your</h2>

							<form>
								<h4>
									<p
										className={`selected ${uSelected}`}
										onClick={() =>
											this.setState({
												loginWith: 'Username',
												Selected: 'username',
											})
										}>
										username
									</p>
									<p
										className={`selected ${eSelected}`}
										onClick={() =>
											this.setState({ loginWith: 'Email', Selected: 'email' })
										}>
										email
									</p>
								</h4>
								<label>
									{this.state.loginWith}
									<input
										type='text'
										value={this.state[loginType]}
										onChange={this.handleInput(loginType)}
									/>
								</label>
								<label>
									Password
									<input
										type='password'
										value={this.state.password}
										onChange={this.handleInput('password')}
									/>
								</label>
								{errors.length > 0 ? (
									<h3 className='form-errors'>{errors[0]}</h3>
								) : (
									<h3 className='form-errors none'></h3>
								)}
								<button onClick={this.handleSubmit}>Log In</button>
							</form>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Login;
