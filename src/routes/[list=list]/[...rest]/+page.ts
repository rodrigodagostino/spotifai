import fetchRefresh from '$helpers/fetch-refresh';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch: _fetch, url, params, depends, route }) => {
  depends(`app:${route.id}`);
  const fetch = (path: string) => fetchRefresh(_fetch, path);

  const { list, rest } = params;
  const limit = 18;
  const page = url.searchParams.get('page');

  const searchParams = new URLSearchParams({
    limit: `${limit}`,
    offset: page ? `${limit * (Number(page) - 1)}` : '0',
  }).toString();

  let request;
  let title;

  if (list === 'section' && rest === 'new-releases') {
    request = fetch(`/api/spotify/browse/new-releases?${searchParams}`);
    title = 'New Releases';
  } else if (list === 'section' && rest === 'featured-playlists') {
    request = fetch(`/api/spotify/browse/featured-playlists?${searchParams}`);
    title = 'Featured Playlists';
  } else if (list === 'category') {
    request = fetch(`/api/spotify/browse/categories/${rest}/playlists?${searchParams}`);
    const categoryInfo = await fetch(`/api/spotify/browse/categories/${rest}`);
    const categoryInfoJSON: SpotifyApi.CategoryObject = categoryInfo.ok
      ? await categoryInfo.json()
      : undefined;
    title = categoryInfoJSON ? `${categoryInfoJSON.name} Playlists` : 'Playlists';
  } else if (list === 'profile' && rest === 'following') {
    request = fetch(`/api/spotify/me/following?type=artist&${searchParams}`);
    title = 'Following';
  } else if (list === 'artist') {
    const artistID = rest.split('/')[0];
    const dataType = rest.split('/')[1];
    if (!artistID || !['albums', 'appears-on', 'related-artists'].includes(dataType)) {
      throw error(404, { message: 'Page not found!' });
    }
    const artistInfo = await fetch(`/api/spotify/artists/${artistID}`);
    const artistInfoJSON: SpotifyApi.SingleArtistResponse = artistInfo.ok
      ? await artistInfo.json()
      : undefined;

    if (dataType === 'albums') {
      request = fetch(
        `/api/spotify/artists/${artistID}/albums?include_groups=album,single&${searchParams}`
      );
      title = artistInfoJSON ? `${artistInfoJSON.name} Albums` : 'Albums';
    }
    if (dataType === 'appears-on') {
      request = fetch(
        `/api/spotify/artists/${artistID}/albums?include_groups=appears_on&${searchParams}`
      );
      title = artistInfoJSON ? `${artistInfoJSON.name} Appearances` : 'Appearances';
    }
    if (dataType === 'related-artists') {
      request = fetch(`/api/spotify/artists/${artistID}/related-artists`);
      title = artistInfoJSON ? `Related to ${artistInfoJSON.name}` : 'Related Artists';
    }
  }

  if (!request) throw error(404, 'Page not found');

  const response = await request;

  if (!response.ok) throw error(response.status, 'Failed to load data!');

  const responseJSON:
    | SpotifyApi.ListOfNewReleasesResponse
    | SpotifyApi.ListOfFeaturedPlaylistsResponse
    | SpotifyApi.CategoryPlaylistsResponse
    | SpotifyApi.UsersFollowedArtistsResponse
    | SpotifyApi.ArtistsAlbumsResponse
    | SpotifyApi.ArtistsRelatedArtistsResponse = await response.json();

  const getData = () => {
    if ('items' in responseJSON) return responseJSON;
    if ('playlists' in responseJSON) return responseJSON.playlists;
    if ('albums' in responseJSON) return responseJSON.albums;
    if ('artists' in responseJSON) {
      if ('items' in responseJSON.artists) {
        return responseJSON.artists;
      } else {
        return { items: responseJSON.artists };
      }
    }
  };

  return {
    data: getData(),
    title,
  };
};
