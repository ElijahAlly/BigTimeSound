import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class PlaylistModal extends Component {
	constructor(props) {
		super(props);
		const playlist = this.props.playlist || {
			user_id: null,
			name: 'Placeholder',
			id: null,
		};
		this.state = {
			user_id: playlist.user_id,
			name: `${playlist.name}`,
			id: playlist.id,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props
			.updatePlaylist(this.state.user_id, this.state)
			.then(({playlist}) => {
				this.props.history.push(`/users/${playlist.user_id}`)
				this.props.history.push(`/users/${playlist.user_id}/playlist/${playlist.id}`)
			})
			.then(this.props.closeModal());
	}

	handleInput() {
		return (e) => this.setState({ name: e.target.value });
	}

	render() {
		return (
			<>
				<div className='edit-playlist-modal-header'>
					<h2>Edit details</h2>
					<svg
						onClick={() => this.props.closeModal()}
						fill='currentColor'
						height='16'
						width='16'
						viewBox='0 0 16 16'
						className='svg-exit'>
						<path d='M14.354 2.353l-.708-.707L8 7.293 2.353 1.646l-.707.707L7.293 8l-5.647 5.646.707.708L8 8.707l5.646 5.647.708-.708L8.707 8z'></path>
					</svg>
				</div>
				<div className={'edit-playlist-modal-input'}>
					<form
						onSubmit={this.handleSubmit}
						className='edit-playlist-modal-input'>
						<input
							type='text'
							value={this.state.name}
							onChange={this.handleInput()}
						/>
						<button>SAVE</button>
					</form>
				</div>
			</>
		);
	}
}

export default PlaylistModal;
