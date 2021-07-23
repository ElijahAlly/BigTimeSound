import { combineReducers } from 'redux';
import SessionErrorsReducer from '../session_errors_reducer';
import UserErrorsReducer from '../user_errors_reducer';
import PlaylistErrorsReducer from '.././playlist_reducers/playlist_errors_reducer'

export default combineReducers({
  session: SessionErrorsReducer,
  user: UserErrorsReducer,
  playlist: PlaylistErrorsReducer,
});
