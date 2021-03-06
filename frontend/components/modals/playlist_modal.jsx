import React, { Component } from 'react';
import EmojiList from '../items/emoji_list';

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
			nameIsEmpty: false,
			emojiExpanded: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.addEmojiToValue = this.addEmojiToValue.bind(this);
		this.toggleEmoji = this.toggleEmoji.bind(this);
	}

	componentDidMount() {
		const input = document.getElementById('playlist-modal-input');
		input.focus();
	}

	toggleEmoji() {
		const emojiExpanded = !this.state.emojiExpanded;
		this.setState({ emojiExpanded });
	}

	addEmojiToValue(emoji) {
		const prevName = this.state.name;
		this.setState({ name: `${prevName}${emoji}`, nameIsEmpty: false });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props
			.updatePlaylist(this.state.user_id, this.state)
			.then(({ playlist }) => {
				this.props.history.push(`/users/${playlist.user_id}`);
				this.props.history.push(
					`/users/${playlist.user_id}/playlist/${playlist.id}`
				);
			})
			.then(this.props.closeModal());
	}

	handleInput(e) {
		if (e.target.value === '') {
			this.setState({ name: '', nameIsEmpty: true });
			return;
		}

		this.setState({ name: e.target.value, nameIsEmpty: false });
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
				<section className='playlist-modal-info-section'>
					<img src={this.props.imgSrc} className='modal-picture' />
					<form
						onSubmit={this.handleSubmit}
						className='edit-playlist-modal-input'>
						<div>
							<input
								id='playlist-modal-input'
								type='text'
								value={this.state.name}
								onChange={this.handleInput}
							/>
						</div>
						<EmojiList large={false} addEmojiToValue={this.addEmojiToValue} />
						<div id='expand-emojis' onClick={this.toggleEmoji}>
							{this.state.emojiExpanded ? 'CLOSE' : 'EXPAND'}
						</div>
						{this.state.emojiExpanded ? (
							<EmojiList large={true} addEmojiToValue={this.addEmojiToValue} />
						) : (
							<></>
						)}
						<button
							disabled={this.state.nameIsEmpty}
							id={`save-disabled-${this.state.nameIsEmpty}`}>
							SAVE
						</button>
					</form>
				</section>
			</>
		);
	}
}

export default PlaylistModal;
