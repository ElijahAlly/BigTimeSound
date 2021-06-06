import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { ProtectedRoute } from '../../util/route_util';

class MainShowPage extends Component {
	constructor(props) {
		super(props);
	}
 
	render() {
		return (
			<section className='main-show-page'>
				<div>paste this in the console to go back to home page (log out): deletesession()(dispatch)</div>
				<Switch>
					
				</Switch>
			</section>
		);
	}
}

export default MainShowPage;
