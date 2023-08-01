import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import fetchRefresh from '$helpers/fetch-refresh';

export const load: PageLoad = async ({ fetch: _fetch, params, parent, depends, route }) => {
  depends(`app:${route.id}`);
  const { user } = await parent();
  const fetch = (path: string) => fetchRefresh(_fetch, path);

  const artistResponse = await fetch(`/api/spotify/artists/${params.id}`);
  if (!artistResponse.ok) throw error(artistResponse.status, 'Failed to load artist!');
  const artistResponseJSON: SpotifyApi.ArtistObjectFull = await artistResponse.json();

  let colorRequest;
  if (artistResponseJSON.images.length > 0) {
    colorRequest = await fetch(
      `/api/average-color?${new URLSearchParams({
        image: artistResponseJSON.images[0].url,
      }).toString()}`
    );
  }

  const [
    topTracksResponse,
    albumsResponse,
    appearsOnResponse,
    relatedArtistsResponse,
    colorResponse,
  ] = await Promise.all([
    fetch(`/api/spotify/artists/${params.id}/top-tracks?market=${user?.country || 'US'}`),
    fetch(`/api/spotify/artists/${params.id}/albums?limit=6&include_groups=album,single`),
    fetch(`/api/spotify/artists/${params.id}/albums?limit=6&include_groups=appears_on`),
    fetch(`/api/spotify/artists/${params.id}/related-artists`),
    colorRequest,
  ]);

  const topTracksResponseJSON: SpotifyApi.ArtistsTopTracksResponse = await topTracksResponse.json();
  const albumsResponseJSON: SpotifyApi.ArtistsAlbumsResponse = await albumsResponse.json();
  const appearsOnResponseJSON: SpotifyApi.ArtistsAlbumsResponse = await appearsOnResponse.json();
  const relatedArtistsResponseJSON: SpotifyApi.ArtistsRelatedArtistsResponse =
    await relatedArtistsResponse.json();

  return {
    artist: artistResponseJSON,
    topTracks: topTracksResponseJSON,
    albums: albumsResponseJSON,
    appearsOn: appearsOnResponseJSON,
    relatedArtists: relatedArtistsResponseJSON,
    color: colorResponse?.ok ? colorResponse.json().then((r) => r.color) : null,
  };
};
