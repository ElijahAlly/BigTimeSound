import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import SignupContainer from './session/signup_container';
import UserHomeContainer from './user/user_home_container';
import LoginContainer from './session/login_container';
import HomeContainer from './home/home_container';

const App = () => (
	<div className='main-body'>
		<Switch>
			<ProtectedRoute path='/users/:id' component={UserHomeContainer} />
			<AuthRoute path='/login' component={LoginContainer} />
			<AuthRoute path='/signup' component={SignupContainer} />
			<AuthRoute path='/' component={HomeContainer} />
		</Switch>
	</div>
);

export default App;
