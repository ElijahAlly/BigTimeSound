import { connect } from 'react-redux';
import { deleteSession } from '../../actions/session_actions';
import UserSearch from './user_search';

const mSTP = (state, ownProps) => ({
	currentUser: state.entities.user[state.session.currentUser],
});

const mDTP = (dispatch) => ({
	logout: () => dispatch(deleteSession()),
});

export default connect(mSTP, mDTP)(UserSearch);