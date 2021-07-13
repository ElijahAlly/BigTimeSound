import * as AlbumApiUtil from '../util/album_api_util';

export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';
export const COLLAPSE_ALBUM_COVER = 'COLLAPSE_ALBUM_COVER';
export const EXPAND_ALBUM_COVER = 'EXPAND_ALBUM_COVER';

const receiveAlbums = (albums) => ({
	type: RECEIVE_ALBUMS,
	albums,
});

export const collapseAlbumCover = () => ({
	type: COLLAPSE_ALBUM_COVER,
});

export const expandAlbumCover = () => ({
	type: EXPAND_ALBUM_COVER,
});

export const fetchAlbums = () => (dispatch) =>
	AlbumApiUtil.fetchAlbums()
	.then((albums) => dispatch(receiveAlbums(albums)));
