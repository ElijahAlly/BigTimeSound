import * as SongApiUtil from '../util/album_api_util';

export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';

const receiveAlbum = ({album}) => ({
	type: RECEIVE_ALBUM,
	album,
});


export const fetchAlbum = (albumId) => (dispatch) =>
	SongApiUtil.fetchAlbum(albumId).then(
		(album) => dispatch(receiveAlbum(album)),
	);
