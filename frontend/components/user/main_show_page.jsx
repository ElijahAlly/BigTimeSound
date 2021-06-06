import React, { Component } from 'react';
import UserHeaderContainer from './user_header_container'
import HomeScreen from '../screens/home_screen'
import SearchScreen from '../screens/search_screen'
import LibraryScreen from '../screens/library_screen'
import CreatePlaylistScreen from '../screens/create_playlist_screen'
import LikedSongsScreen from '../screens/liked_songs_screen'

const MainShowPage = (props) => {
	if (props.path === "/users/:id") {
		return (
			<section className='main-show-page'>
				<UserHeaderContainer />
				<HomeScreen props={props}/>
			</section>
		)
	} else if (props.path === "/users/:id/search") {
		return (
			<section className='main-show-page'>
				<UserHeaderContainer />
				<SearchScreen props={props}/>
			</section>
		)
	} else if (props.path === "/users/:id/library") {
		return (
			<section className='main-show-page'>
				<UserHeaderContainer />
				<LibraryScreen props={props}/>
			</section>
		)
	} else if (props.path === "/users/:id/create-playlist") {
		return (
			<section className='main-show-page'>
				<UserHeaderContainer />
				<CreatePlaylistScreen props={props}/>
			</section>
		)
	} else if (props.path === "/users/:id/liked-songs") {
		return (
			<section className='main-show-page'>
				<UserHeaderContainer />
				<LikedSongsScreen props={props}/>
			</section>
		)
	} else {
		return <div>somethings wrong</div>
	}

}

export default MainShowPage;
