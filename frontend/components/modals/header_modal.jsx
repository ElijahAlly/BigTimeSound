import React, { Component } from 'react';
import {connect} from 'react-redux'
import { deleteSession } from '../../actions/session_actions';

const HeaderModal = ({logout, currentUser}) => {
	return (
		<>
			<button
				className='profile-closed'
				onClick={() => (
					<Link to={`/users/${currentUser.id}/profile`} />
				)}>
				Profile
			</button>
			<button className='profile-closed' onClick={() => logout()}>
				logout
			</button>
		</>
	);
};

const mSTP = (state, ownProps) => {
    return ({
        currentUser: state.entities.user[state.session.currentUser]
    })
}

const mDTP = (dispatch) => {
    return ({
        logout: () => dispatch(deleteSession())
    })
}

export default connect(mSTP, mDTP)(HeaderModal);
