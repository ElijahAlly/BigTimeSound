import React from 'react';


import UserHeaderContainer from './user_header_container';
import SideNavBarContainer from './side_nav_bar_container'
import SongPlaybackBar from './song_playback_bar'

import HomeScreen from '../screens/home_screen';
import SearchScreen from '../screens/search_screen';
import LibraryScreen from '../screens/library_screen';
import LikedSongsScreen from '../screens/liked_songs_screen';
import PlaylistShowContainer from '../screens/playlist_show_container';
import ProfileScreen from '../screens/profile_screen'

const MainShowPage = (props) => {
	let component;
	let selected;
	let color = 'white';

	if (props.path === '/users/:id') {
		component = <HomeScreen props={props} />
		selected = 'home'
		color = '#3f2657'
	} else if (props.path === '/users/:id/search') {
		component = <SearchScreen props={props} />
		selected = 'search'
		color = '#76c2af'
		
	} else if (props.path === '/users/:id/library') {
		component = <LibraryScreen props={props} />
		selected = 'library'
		color = '#796f72'
		
	} else if (props.path === '/users/:id/liked-songs') {
		component = <LikedSongsScreen props={props} />
		selected = 'none'
		color = '#5038a0'
		
	} else if (props.path === '/users/:id/playlist/:id') {
		component = <PlaylistShowContainer props={props} />
		selected = 'none'
		color = '#8c4f4b'

	} else if (props.path === '/users/:id/profile') {
		component = <ProfileScreen props={props} />
		selected = 'none'

	} else {
		return <div>somethings wrong</div>;
	}
	
	props.fetchAllPlaylists(props.currentUser.id);

	return (
		<section className='main-show-page'>
			<UserHeaderContainer />
			<SideNavBarContainer
				currentUser={props.currentUser}
				logout={() => props.logout()}
				selected={selected}
			/>
			{component}
			<SongPlaybackBar />
		</section>
	);
};

export default MainShowPage;
