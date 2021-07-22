import React from 'react';
import { connect } from 'react-redux';
import { deleteSession } from '../../actions/session_actions';
import MainShowPageContainer from './main_show_page_container';

const SwitchScreen = (props) => {
	return (
		<div id='main'>
			<MainShowPageContainer path={props.match.path} />
		</div>
	);
}

const mSTP = (state, ownProps) => ({
	currentUser: state.entities.user[state.session.currentUser],
});

const mDTP = (dispatch) => ({
	logout: () => dispatch(deleteSession()),
});

export default connect(mSTP, mDTP)(SwitchScreen);
