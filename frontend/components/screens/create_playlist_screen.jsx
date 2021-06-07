import React, { Component } from 'react';

class CreatePlaylistScreen extends Component {
	constructor(props) {
		super(props);
		console.log('create', this.props)
		const curUser = this.props.currentUser;
		this.state = {
			user_id: curUser.id,
			name: `My Playlist #$`,
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(type) {
		return (e) => {
			this.setState({ [type]: e.target.value });
		};
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.createPlaylist(this.state);
	}

	render() {
		return (
			<div className='create-playlist-screen'>
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
						<input
							type='text'
							value={this.state.name}
							onChange={this.handleInput('name')}
						/>
					</label>
					<button>Create Playlist</button>
				</form>
			</div>
		);
	}
}

export default CreatePlaylistScreen;
