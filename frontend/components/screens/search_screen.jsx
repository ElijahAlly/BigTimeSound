import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {addPath} from '../../actions/path_actions'
import {handleColorShift} from '../../util/header_color_switch'

class SearchScreen extends Component {
	componentDidMount() {
		this.props.addPath(this.props.history.location.pathname)
		window.scrollTo(0, 0);
		handleColorShift('#76c2af')
		const main = document.getElementById('main')
		main.style.background = '#76c2af';
	}

	render() {
		return <div className='screen search-screen'>search</div>;
	}
}

const mDTP = (dispatch) => ({
	addPath: (path) => dispatch(addPath(path))
})

export default withRouter(connect(null, mDTP)(SearchScreen));
