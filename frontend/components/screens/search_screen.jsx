import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {handleColorShift} from '../../util/header_color_switch'

class SearchScreen extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
		handleColorShift('#76c2af')
		const main = document.getElementById('main')
		main.style.background = '#76c2af';
	}

	render() {
		return <div className='screen search-screen'>search</div>;
	}
}

export default withRouter(connect(null)(SearchScreen));
