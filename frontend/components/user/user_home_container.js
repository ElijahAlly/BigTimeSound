import { connect } from 'react-redux';
import { deleteSession } from '../../actions/session_actions';
import UserHome from './user_home';

const mSTP = (state, ownProps) => ({
	currentUser: state.entities.user[state.session.currentUser],
});

const mDTP = (dispatch) => ({
	logout: () => dispatch(deleteSession()),
});

export default connect(mSTP, mDTP)(UserHome);