import { connect } from 'react-redux';
import { deleteSession } from '../../actions/session_actions';
import UserHeader from './user_header';

const mSTP = ({ entities: { user }, session }, ownProps) => ({
	currentUser: user[session.currentUser],
});

const mDTP = (dispatch) => ({
	logout: () => dispatch(deleteSession()),
});

export default connect(mSTP, mDTP)(UserHeader);
