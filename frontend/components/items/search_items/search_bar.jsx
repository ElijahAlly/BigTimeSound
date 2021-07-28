import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	sendSearch,
	fetchSearchResults,
	clearSearchResults,
} from '../../../actions/search_actions';
import EmojiList from '../emoji_list';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			emojiExpanded: false,
		};

		this.handleInput = this.handleInput.bind(this);
		this.toggleEmoji = this.toggleEmoji.bind(this);
		this.addEmojiToValue = this.addEmojiToValue.bind(this);
	}

	toggleEmoji() {
		const emojiExpanded = !this.state.emojiExpanded;
		this.setState({ emojiExpanded });
	}

	addEmojiToValue(emoji) {
		const input = document.getElementsByClassName('search-input')[0];
		input.focus();
		const prevValue = this.state.value;
		const value = `${prevValue}${emoji}`;
		this.setState({ value, emojiExpanded: false });
		this.props
			.fetchSearchResults(value)
			.then(() => this.props.sendSearch(value));
	}

	componentDidMount() {
		const input = document.getElementsByClassName('search-input')[0];
		input.focus();
	}

	handleInput(e) {
		let value = e.currentTarget.value;
		this.props
			.fetchSearchResults(value)
			.then(() => this.props.sendSearch(value));
		this.setState({ value });
	}

	componentWillUnmount() {
		this.props.clearSearchResults();
	}

	render() {
		const { placeholder, onHeader } = this.props;
		return (
			<div className='search-bar-container'>
				<svg
					height='24'
					role='img'
					width='24'
					viewBox='0 0 512 512'
					id='search-icon'
					aria-hidden='true'>
					<path
						d='M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z'
						fill='currentColor'></path>
				</svg>
				<input
					className='search-input'
					maxLength='80'
					autoCorrect='off'
					autoComplete='off'
					autoCapitalize='off'
					spellCheck='false'
					placeholder={placeholder}
					value={this.state.value}
					onChange={this.handleInput}></input>
				{onHeader ? (
					<div className='search-emoji-btn' onClick={this.toggleEmoji}>
						🙂
					</div>
				) : (
					<></>
				)}
				{this.state.emojiExpanded ? (
					<EmojiList large={true} addEmojiToValue={this.addEmojiToValue} />
				) : (
					<></>
				)}
			</div>
		);
	}
}

const mDTP = (dispatch) => ({
	sendSearch: (input) => dispatch(sendSearch(input)),
	clearSearchResults: () => dispatch(clearSearchResults()),
	fetchSearchResults: (input) => dispatch(fetchSearchResults(input)),
});

export default connect(null, mDTP)(SearchBar);
