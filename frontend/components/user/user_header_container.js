import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import {
	addBackPath,
	removeBackPath,
	addForwardPath,
	removeForwardPath,
} from '../../actions/path_actions';
import { deleteSession } from '../../actions/session_actions';
import UserHeader from './user_header';

const mSTP = ({ entities, session, ui }, ownProps) => ({
	currentUser: entities.user[session.currentUser],
	goBackCount: ui.path.goBackCount,
	goForwardCount: ui.path.goForwardCount,
});

const mDTP = (dispatch) => ({
	logout: () => dispatch(deleteSession()),
	openModal: (modal) => dispatch(openModal(modal)),
	addBackPath: () => dispatch(addBackPath()),
	removeBackPath: () => dispatch(removeBackPath()),
	addForwardPath: () => dispatch(addForwardPath()),
	removeForwardPath: () => dispatch(removeForwardPath()),
});

export default withRouter(connect(mSTP, mDTP)(UserHeader));
