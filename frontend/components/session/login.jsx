import React, { Component } from 'react';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginWith: 'Username',
			username: '',
			email: '',
			password: '',
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillUnmount() {
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
			.then(() => this.props.history.push(`/users/${this.props.currentUser}`));
	}

	render() {
		const loginType = this.state.loginWith.toLowerCase();
		return (
			<div className='login-cont'>
				<h2>Log In</h2>

				<form>
					<h4>
						Log in with{' '}
						<p onClick={() => this.setState({ loginWith: 'Username' })}>
							username
						</p>{' '}
						or{' '}
						<p onClick={() => this.setState({ loginWith: 'Email' })}>email</p>
					</h4>
					<label>
						{this.state.loginWith}:
						<input
							type='text'
							value={this.state[loginType]}
							onChange={this.handleInput(loginType)}
						/>
					</label>
					<label>
						Password:
						<input
							type='password'
							value={this.state.password}
							onChange={this.handleInput('password')}
						/>
					</label>
					<button onClick={this.handleSubmit}>Log In</button>
				</form>
			</div>
		);
	}
}

export default Login;
