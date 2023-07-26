import { error } from '@sveltejs/kit';
import fetchRefresh from '$helpers/fetch-refresh';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const playlistResponse = await fetchRefresh(
    fetch,
    `/api/spotify/playlists/${params.id}?${new URLSearchParams({
      fields: 'id,name,description',
    }).toString()}`
  );

  if (!playlistResponse.ok) throw error(playlistResponse.status, 'Failed to load playlist!');

  const playlistJSON: SpotifyApi.SinglePlaylistResponse = await playlistResponse.json();

  return {
    playlist: playlistJSON,
  };
};
