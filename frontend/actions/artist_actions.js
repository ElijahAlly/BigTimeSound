import * as ArtistApiUtil from '../util/backend/artist_api_util';

export const RECEIVE_ARTISTS = 'RECEIVE_ARTISTS';

const receiveArtists = (artists) => ({
	type: RECEIVE_ARTISTS,
	artists,
});

export const fetchArtists = () => (dispatch) =>
	ArtistApiUtil.fetchArtists()
	.then((artists) => dispatch(receiveArtists(artists)));
