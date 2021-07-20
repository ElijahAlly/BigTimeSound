import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	sendSearch,
	fetchSearchResults,
	clearSearch,
} from '../../actions/search_actions';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		let value = e.currentTarget.value;
		this.props
			.fetchSearchResults(value)
			.then(() => this.props.sendSearch(value));
		this.setState({ value });
	}

	render() {
		return (
			<>
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
					placeholder='Artists, songs, or playlists'
					value={this.state.value}
					onChange={this.handleInput}></input>
			</>
		);
	}
}

const mDTP = (dispatch) => ({
	sendSearch: (input) => dispatch(sendSearch(input)),
	clearSearch: () => dispatch(clearSearch()),
	fetchSearchResults: (input) => dispatch(fetchSearchResults(input)),
});

export default connect(null, mDTP)(SearchBar);
