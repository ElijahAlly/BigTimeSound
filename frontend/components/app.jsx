import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import SignupContainer from './session/signup_container';
import UserHomeContainer from './user/user_home_container';
import LoginContainer from './session/login_container';
import HomeContainer from './home_container';

const App = () => (
	<div>
		<AuthRoute exact path='/' component={HomeContainer} />
		<ProtectedRoute path='/users/:id' component={UserHomeContainer} />

		<AuthRoute path='/login' component={LoginContainer} />
		<AuthRoute path='/signup' component={SignupContainer} />
	</div>
);

export default App;
