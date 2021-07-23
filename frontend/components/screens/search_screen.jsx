import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleColorShift } from '../../util/general_functions/header_color_switch';
import { shuffleArray } from '../../util/general_functions/shuffle_array';
import {
	assignArtistsToAlbums,
	assignImages,
	assignImagesToSongs,
} from '../../util/general_functions/assign_functions';
import ListWithPicture from '../items/song_items/list_with_picture';
import TopSearchResult from '../items/search_items/top_search_result';
import { clearSearchResults } from '../../actions/search_actions';
import { findBestMatch } from 'string-similarity';
import { fetchLikedSongs, likeSong, unlikeSong } from '../../actions/song/song_actions';

class SearchScreen extends Component {

	constructor(props) {
		super(props)
		this.toggleLike = this.toggleLike.bind(this)
	}

	componentDidMount() {
		this.props.clearSearchResults();
		window.scrollTo(0, 0);
		handleColorShift('#1a1818');
		const main = document.getElementById('main');
		main.style.background = '#1a1818';
		this.props.fetchLikedSongs(this.props.userId);
	}

	shouldComponentUpdate(nextProps) {
		if (
			this.props.searchInput !== nextProps.searchInput ||
			this.props.likes !== nextProps.likes ||
			this.props.searchedAlbums !== nextProps.searchedAlbums ||
			this.props.searchedArtists !== nextProps.searchedArtists ||
			this.props.searchedPlaylists !== nextProps.searchedPlaylists ||
			this.props.searchedSongs !== nextProps.searchedSongs
		)
			return true;
		return false;
	}

	componentWillUnmount() {
		this.props.clearSearchResults();
	}

	toggleLike(song) {
		const {likedSongsObj, userId, unlikeSong, likeSong, likes} = this.props;

		if (likedSongsObj[song.id]) {
			const likeId = likes[song.id].id
			unlikeSong(userId, likeId);
			return;
		}

		likeSong(userId, song.id)
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
		let {
			albums,
			artists,
			likedSongs,
			searchInput,
			searchedSongs,
			searchedAlbums,
			searchedArtists,
			searchedPlaylists,
		} = this.props;

		albums = shuffleArray(albums);
		artists = shuffleArray(artists);
		if (albums.length > 10) albums = albums.slice(0, 10);
		if (artists.length > 10) artists = artists.slice(0, 10);

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
						<h1 className='suggested-header'>Suggested Artists</h1>
						<ListWithPicture list={artists} shouldSlice={false} />
						<h1 className='suggested-header'>Suggested Albums</h1>
						<ListWithPicture list={albums} shouldSlice={false} />
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
								<section className='search-top-results-songs'>
									<section className='top-result-container'>
										<h1 className='suggested-header'>Top Result</h1>
										<TopSearchResult item={bestMatchResult} />
									</section>
									{searchedSongs.length > 0 ? (
										<section className='songs-container'>
											<h1 className='suggested-header'>Songs</h1>
											<ListWithPicture
												songs={searchedSongs}
												shouldSlice={false}
												likedSongs={likedSongs}
												toggleLike={this.toggleLike}
											/>
										</section>
									) : (
										<section className='songs-container'></section>
									)}
								</section>
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
								{searchedAlbums.length > 0 ? (
									<>
										<h1 className='suggested-header'>Albums</h1>
										<ListWithPicture
											albums={searchedAlbums}
											shouldSlice={false}
										/>
									</>
								) : (
									<div className='no-results'></div>
								)}
							</>
						)}
					</>
				)}
			</div>
		);
	}
}

const mSTP = ({ entities, ui, session }) => ({
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
	userId: session.currentUser,
	likedSongs: Object.values(entities.likedSongs.songs),
	likedSongsObj: entities.likedSongs.songs,
	likes: entities.likedSongs.likes,
});

const mDTP = (dispatch) => ({
	clearSearchResults: () => dispatch(clearSearchResults()),
	fetchLikedSongs: (userId) => dispatch(fetchLikedSongs(userId)),
	likeSong: (userId, songId) => dispatch(likeSong(userId, songId)),
	unlikeSong: (userId, likeId) => dispatch(unlikeSong(userId, likeId)),
});

export default withRouter(connect(mSTP, mDTP)(SearchScreen));
