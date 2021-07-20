import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleColorShift } from '../../util/header_color_switch';
import { shuffleArray } from '../../util/shuffle_array';
import {
	assignArtistsToAlbums,
	assignImages,
	assignImagesToSongs,
} from '../../util/assign_functions';
import ListWithPicture from '../items/list_with_picture';
import TopSearchResult from '../items/top_search_result';
import { clearSearch } from '../../actions/search_actions';
import { findBestMatch } from 'string-similarity';

class SearchScreen extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		handleColorShift('#1a1818');
		const main = document.getElementById('main');
		main.style.background = '#1a1818';
	}

	shouldComponentUpdate(nextProps) {
		if (
			this.props.searchInput !== nextProps.searchInput ||
			this.props.searchedAlbums !== nextProps.searchedAlbums ||
			this.props.searchedArtists !== nextProps.searchedArtists ||
			this.props.searchedPlaylists !== nextProps.searchedPlaylists ||
			this.props.searchedSongs !== nextProps.searchedSongs
		)
			return true;
		return false;
	}

	componentWillUnmount() {
		this.props.clearSearch();
	}

	getStringsFromObjects(arr) {
		let strs = [];
		arr.forEach((obj) => {
			if (obj.name) {
				strs.push(obj.name);
			} else {
				strs.push(obj.title);
			}
		});

		return strs;
	}

	getObjectFromStr(str, arrOfObjects) {
		let matchObj = null;

		arrOfObjects.forEach((obj) => {
			if (obj.name && obj.name === str) {
				matchObj = obj;
				return;
			} else if (obj.title && obj.title === str) {
				matchObj = obj;
				return;
			}
		});

		return matchObj;
	}

	render() {
		const {
			albums,
			artists,
			searchInput,
			searchedAlbums,
			searchedArtists,
			searchedSongs,
			searchedPlaylists,
		} = this.props;

		let list = [...albums, ...artists];
		list = shuffleArray(list);
		if (list.length > 20) list = list.slice(0, 20);

		const arrOfObjects = [
			...searchedAlbums,
			...searchedArtists,
			...searchedPlaylists,
			...searchedSongs,
		];
		const arrOfStrings = this.getStringsFromObjects(arrOfObjects);
		const bestMatchStr =
			searchInput && searchInput.length > 0 && arrOfObjects.length > 0
				? findBestMatch(searchInput, arrOfStrings).bestMatch.target
				: null;
		const bestMatchResult = this.getObjectFromStr(bestMatchStr, arrOfObjects);

		return (
			<div className='screen search-screen'>
				{searchInput === '' ? (
					<>
						<h1 className='suggested-header'>Suggested Artists and Albums</h1>
						<ListWithPicture list={list} shouldSlice={false} />
					</>
				) : (
					<>
						{searchedArtists.length === 0 &&
						searchedAlbums.length === 0 &&
						searchedPlaylists.length === 0 &&
						searchedSongs.length === 0 ? (
							<div className='search-error-container'>
								<h1>No results found for "{searchInput}"</h1>
								<h3>
									Please make sure your words are spelled correctly or use less
									or different keywords.
								</h3>
							</div>
						) : (
							<>
								<section>
									<h1 className='suggested-header'>Top Result</h1>
									<TopSearchResult item={bestMatchResult} />
									{searchedAlbums.length > 0 ? (
										<>
											<h1 className='suggested-header'>Songs</h1>
											<ListWithPicture
												songs={searchedSongs}
												shouldSlice={false}
											/>
										</>
									) : (
										<section></section>
									)}
								</section>
								{searchedAlbums.length > 0 ? (
									<>
										<h1 className='suggested-header'>Albums</h1>
										<ListWithPicture
											albums={searchedAlbums}
											shouldSlice={false}
										/>
									</>
								) : (
									<></>
								)}
								{searchedArtists.length > 0 ? (
									<>
										<h1 className='suggested-header'>Artists</h1>
										<ListWithPicture
											artists={searchedArtists}
											shouldSlice={false}
										/>
									</>
								) : (
									<></>
								)}
							</>
						)}
					</>
				)}
			</div>
		);
	}
}

const mSTP = ({ entities, ui }) => ({
	albums: assignArtistsToAlbums(entities.artists, entities.albums),
	artists: assignImages(entities.artists, entities.albums),
	searchInput: ui.search.input,
	searchedAlbums: assignArtistsToAlbums(
		entities.artists,
		ui.search.results.albums
	),
	searchedArtists: assignImages(ui.search.results.artists, entities.albums),
	searchedSongs: assignImagesToSongs(ui.search.results.songs, entities.albums),
	searchedPlaylists: ui.search.results.playlists,
});

const mDTP = (dispatch) => ({
	clearSearch: () => dispatch(clearSearch()),
});

export default withRouter(connect(mSTP, mDTP)(SearchScreen));
