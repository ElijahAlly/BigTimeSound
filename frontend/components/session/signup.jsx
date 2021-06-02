import React, { Component } from 'react';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
		return (e) => this.setState({ [type]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props
			.createUser(this.state)
			.then(() => this.props.history.push(`/users/${this.props.currentUser}`));
	}

	render() {
		const { errors } = this.props;
		return (
			<div className='signup-cont'>
				<h2>Sign Up</h2>

				<form onSubmit={this.handleSubmit}>
					<label>
						Username:
						<input
							type='text'
							value={this.state.username}
							onChange={this.handleInput('username')}
						/>
					</label>
					<label>
						Email:
						<input
							type='text'
							value={this.state.email}
							onChange={this.handleInput('email')}
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
					<button>Sign Up</button>
				</form>
			</div>
		);
	}
}

export default SignUp;
