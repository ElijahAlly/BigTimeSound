import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import SignupContainer from './session/signup_container';
import UserHomeContainer from './user/user_home_container';
import LoginContainer from './session/login_container';
import HomeContainer from './home/home_container';
import UserSearchContainer from './user/user_search_container';
import UserLibraryContainer from './user/user_library_container';
import LikedSongsContainer from './user/liked_songs_container';
import CreatePlaylistContainer from './user/create_playlist_container';
import ProfileContainer from './user/profile_container';

const App = () => (
	<>
		<Switch>
			<ProtectedRoute path='/users/:id/create-playlist' component={CreatePlaylistContainer} />
			<ProtectedRoute path='/users/:id/liked-songs' component={LikedSongsContainer} />
			<ProtectedRoute path='/users/:id/search' component={UserSearchContainer} />
			<ProtectedRoute path='/users/:id/library' component={UserLibraryContainer} />
			<ProtectedRoute path='/users/:id/profile' component={ProfileContainer} />
			<ProtectedRoute path='/users/:id' component={UserHomeContainer} />
			<AuthRoute path='/login' component={LoginContainer} />
			<AuthRoute path='/signup' component={SignupContainer} />
			<AuthRoute path='/' component={HomeContainer} />
		</Switch>
	</>
);

export default App;
