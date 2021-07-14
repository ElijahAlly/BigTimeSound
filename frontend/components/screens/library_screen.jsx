import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {handleColorShift} from '../../util/header_color_switch'


class LibraryScreen extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		handleColorShift('#796f72')
		const main = document.getElementById('main')
		main.style.background = '#796f72';
	}

	render() {
		return <div className='screen library-screen'>library</div>;
	}
}


export default withRouter(connect(null)(LibraryScreen));
