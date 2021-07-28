import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleColorShift } from '../../util/general_functions/header_color_switch';

class LibraryScreen extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		handleColorShift('#1c1c1c');
		const main = document.getElementById('main');
		main.style.background = '#1c1c1c';
	}

	render() {
		return <div className='screen library-screen'></div>;
	}
}

export default withRouter(connect(null)(LibraryScreen));
