import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {addPath} from '../../actions/path_actions'
import {handleColorShift} from '../../util/header_color_switch'


class LibraryScreen extends Component {
	componentDidMount() {
		this.props.addPath(this.props.history.location.pathname)
		window.scrollTo(0, 0);
		handleColorShift('#796f72')
		const main = document.getElementById('main')
		main.style.background = '#796f72';
	}

	render() {
		return <div className='screen library-screen'>library</div>;
	}
}

const mDTP = (dispatch) => ({
	addPath: (path) => dispatch(addPath(path))
})

export default withRouter(connect(null, mDTP)(LibraryScreen));
