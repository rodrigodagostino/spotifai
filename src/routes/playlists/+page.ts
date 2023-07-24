import fetchRefresh from '$helpers/fetch-refresh';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url, parent }) => {
  const limit = 16;
  const page = url.searchParams.get('page');
  const searchParams = new URLSearchParams({
    limit: `${limit}`,
    offset: page ? `${limit * (Number(page) - 1)}` : '0',
  }).toString();

  const response = await fetchRefresh(fetch, `/api/spotify/me/playlists?${searchParams}`);

  if (!response.ok) throw error(response.status, 'Failed to load playlists!');

  const responseJSON: SpotifyApi.ListOfCurrentUsersPlaylistsResponse = await response.json();

  return {
    playlists: responseJSON,
  };
};
