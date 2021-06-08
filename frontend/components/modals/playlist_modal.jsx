import React, { Component } from 'react';

class PlaylistModal extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		// const curUser = this.props.currentUser
		const playlist = this.props.playlist;
		this.state = {
			user_id: playlist.user_id,
			name: `${playlist.name}`,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput() {
		return (e) => {
			this.setState({ name: e.target.value });
		};
	}

	closeModal() {
		const modal = document.getElementById('outer-modal-div');

        if (modal && modal.className === 'open') {
			modal.classList.remove('open');
			modal.classList.add('closed');
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props
			.updatePlaylist(this.state)
			.then(() => (
				<Redirect
					to={`/users/${this.props.playlist.user_id}/playlist/${this.props.playlist.id}`}
				/>
			));
	}

	render() {
		return (
			<section id='modal'>
				<div className='modal-header'>
					<h2>Edit details</h2>
					<svg
						onClick={this.closeModal}
						fill='currentColor'
						height='16'
						width='16'
						viewBox='0 0 16 16'
						className='svg-exit'>
						<path d='M14.354 2.353l-.708-.707L8 7.293 2.353 1.646l-.707.707L7.293 8l-5.647 5.646.707.708L8 8.707l5.646 5.647.708-.708L8.707 8z'></path>
					</svg>
				</div>
				<div className='info'>
					<input
						type='text'
						value={this.state.name}
						onChange={this.handleInput()}
					/>
					<button onClick={this.handleSubmit}>SAVE</button>
				</div>
			</section>
		);
	}
}

export default PlaylistModal;
