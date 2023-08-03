import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, depends, route }) => {
  depends(`app:${route.id}`);
  const query = params.query;
  const searchParams = new URLSearchParams({
    q: query,
    type: 'album,artist,playlist',
    limit: '7',
  }).toString();

  const resultsResponse = await fetch(`/api/spotify/search?${searchParams}`);

  if (!resultsResponse.ok) throw error(resultsResponse.status, 'Failed to load results!');

  const resultsResponseJSON: SpotifyApi.SearchResponse = await resultsResponse.json();

  return {
    results: resultsResponseJSON,
  };
};
