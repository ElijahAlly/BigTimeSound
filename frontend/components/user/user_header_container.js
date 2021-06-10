import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { deleteSession } from '../../actions/session_actions';
import UserHeader from './user_header';

const mSTP = ({ entities: { user }, session }, ownProps) => ({
	currentUser: user[session.currentUser],
});

const mDTP = (dispatch) => ({
	logout: () => dispatch(deleteSession()),
	openModal: (modal) => dispatch(openModal(modal))
});

export default connect(mSTP, mDTP)(UserHeader);
