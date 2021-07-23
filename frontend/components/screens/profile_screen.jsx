import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {handleColorShift} from '../../util/general_functions/header_color_switch'

class ProfileScreen extends Component {
	componentDidMount() {
		handleColorShift()
	}


	render() {
		return <div className='screen profile-screen'>user profile</div>;
	}
}

export default withRouter(connect(null)(ProfileScreen));
