import React, { Component } from 'react';

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
			<div className='login-cont'>
				<h2>Log In Using Your:</h2>

				<form>
					<h4>
						<div>
							<p
								className={`selected ${uSelected}`}
								onClick={() =>
									this.setState({ loginWith: 'Username', Selected: 'username' })
								}>
								username
							</p>{' '}
							<p
								className={`selected ${eSelected}`}
								onClick={() =>
									this.setState({ loginWith: 'Email', Selected: 'email' })
								}>
								email
							</p>
						</div>
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
					{errors.length > 0 ? (
						<h3 className='form-errors'>{errors[0]}</h3>
					) : (
						<h3> </h3>
					)}
					<button onClick={this.handleSubmit}>Log In</button>
				</form>
			</div>
		);
	}
}

export default Login;
