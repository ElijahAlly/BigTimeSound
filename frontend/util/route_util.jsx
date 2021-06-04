import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

// Check to see if user is logged in from session slice of state
const mSTP = (state) => ({
	loggedIn: Boolean(state.session.currentUser),
	currentUserId: state.session.currentUser,
});

// Redirects to the user's show page if logged in or renders component specified
const Auth = ({ loggedIn, path, component: Component, currentUserId }) => (
	<Route
		path={path}
		render={(props) =>
			loggedIn ? (
				<Redirect to={`/users/${currentUserId}`} /> 
			) : (
				<Component {...props} />
			)
		}
	/>
);

// Redirects to the signin page if not logged in or renders component specified
const Protected = ({ loggedIn, path, component: Component }) => (
	<Route
		path={path}
		render={(props) =>
			loggedIn ? <Component {...props} /> : <Redirect to='/signup' />
		}
	/>
);

export const AuthRoute = withRouter(connect(mSTP)(Auth));
export const ProtectedRoute = withRouter(connect(mSTP)(Protected));
