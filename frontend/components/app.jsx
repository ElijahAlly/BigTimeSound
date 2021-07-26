import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import Home from './home/home';
import SwitchScreen from './user/switch_screen_container';
import Modal from './modals/modal';

const App = () => (
	<>
		<Modal />
		<section className='message'>
			<div className='add-song-confirmation'></div>
		</section>
		<Switch>
			<ProtectedRoute path='/users/:id/artist/:id' component={SwitchScreen} />
			<ProtectedRoute path='/users/:id/album/:id' component={SwitchScreen} />
			<ProtectedRoute path='/users/:id/playlist/:id' component={SwitchScreen} />
			<ProtectedRoute path='/users/:id/profile' component={SwitchScreen} />
			<ProtectedRoute path='/users/:id/liked-songs' component={SwitchScreen} />
			<ProtectedRoute path='/users/:id/library' component={SwitchScreen} />
			<ProtectedRoute path='/users/:id/search' component={SwitchScreen} />
			<ProtectedRoute path='/users/:id/queue' component={SwitchScreen} />
			<ProtectedRoute path='/users/:id' component={SwitchScreen} />
			<AuthRoute path='/login' component={LoginContainer} />
			<AuthRoute path='/signup' component={SignupContainer} />
			<AuthRoute path='/' component={Home} />
		</Switch>
	</>
);

export default App;
