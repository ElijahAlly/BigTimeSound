import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';

const App = () => (
	<div>
		<header>Welcome to BigTimeSound!</header>
		<AuthRoute path='/signup' component={SignupContainer} />
        <AuthRoute path='/login' component={LoginContainer} />
	</div>
);

export default App;
