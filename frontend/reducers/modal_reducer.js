import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

export default function modalReducer(state = {modal: null, props: null}, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {modal: action.modal, props: action.props};
    case CLOSE_MODAL:
      return {modal: null, props: null};
    default:
      return state;
  }
}
