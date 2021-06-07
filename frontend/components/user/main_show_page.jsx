import React, { Component } from 'react';
import UserHeaderContainer from './user_header_container';
import HomeScreen from '../screens/home_screen';
import SearchScreen from '../screens/search_screen';
import LibraryScreen from '../screens/library_screen';
import CreatePlaylistScreenContainer from '../screens/create_playlist__screen_container';
import LikedSongsScreen from '../screens/liked_songs_screen';
import PlaylistShowContainer from '../screens/playlist_show_container';

const MainShowPage = (props) => {
	if (props.path === '/users/:id') {
		return (
			<section className='main-show-page'>
				<UserHeaderContainer />
				<HomeScreen props={props} />
			</section>
		);
	} else if (props.path === '/users/:id/search') {
		return (
			<section className='main-show-page'>
				<UserHeaderContainer />
				<SearchScreen props={props} />
			</section>
		);
	} else if (props.path === '/users/:id/library') {
		return (
			<section className='main-show-page'>
				<UserHeaderContainer />
				<LibraryScreen props={props} />
			</section>
		);
	} else if (props.path === '/users/:id/create-playlist') {
		return (
			<section className='main-show-page'>
				<UserHeaderContainer />
				<CreatePlaylistScreenContainer props={props} />
			</section>
		);
	} else if (props.path === '/users/:id/liked-songs') {
		return (
			<section className='main-show-page'>
				<UserHeaderContainer />
				<LikedSongsScreen props={props} />
			</section>
		);
	} else if (props.path === '/users/:id/playlist/:id') {
		return (
			<section className='main-show-page'>
				<UserHeaderContainer />
				<PlaylistShowContainer props={props} />
			</section>
		);
	} else {
		return <div>somethings wrong</div>;
	}
};

export default MainShowPage;
