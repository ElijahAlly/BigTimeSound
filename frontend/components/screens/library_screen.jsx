import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {handleColorShift} from '../../util/header_color_switch'


class LibraryScreen extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		handleColorShift('#4d4c4c')
		const main = document.getElementById('main')
		main.style.background = '#4d4c4c';
	}

	render() {
		return <div className='screen library-screen'>library</div>;
	}
}


export default withRouter(connect(null)(LibraryScreen));
