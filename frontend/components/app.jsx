import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

import SignupContainer from './session/signup_container';
import UserHomeContainer from './user/user_home_container';
import LoginContainer from './session/login_container';
import HomeContainer from './home_container';

const App = () => (
	<div className='main-body'>
		<ProtectedRoute path='/users/:id' component={UserHomeContainer} />
		<AuthRoute path='/login' component={LoginContainer} />
		<AuthRoute path='/signup' component={SignupContainer} />
		<AuthRoute path='/' component={HomeContainer} />
		<div className='background'>
			<p>BIGTIMESOUND PREMIUM</p>
			<h1>Get 3 months of Premium for free</h1>
			<h4>Enjoy ad-free music, offline listening, and more. Cancel anytime.</h4>
			<Link to='/signup'>GET 3 MONTHS FREE</Link>
		</div>
	</div>
);

export default App;
