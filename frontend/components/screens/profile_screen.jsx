import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {addPath} from '../../actions/path_actions'
import {handleColorShift} from '../../util/header_color_switch'

class ProfileScreen extends Component {
	componentDidMount() {
		this.props.addPath(this.props.history.location.pathname)
		handleColorShift()
	}

	render() {
		return <div className='screen profile-screen'>user profile</div>;
	}
}

const mDTP = (dispatch) => ({
	addPath: (path) => dispatch(addPath(path))
})

export default withRouter(connect(null, mDTP)(ProfileScreen));
