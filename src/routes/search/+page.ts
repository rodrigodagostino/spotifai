import fetchRefresh from '$helpers/fetch-refresh';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const categoriesResponse = await fetchRefresh(fetch, '/api/spotify/browse/categories?limit=50');
  const categoriesResponseJSON: SpotifyApi.MultipleCategoriesResponse | undefined =
    categoriesResponse.ok ? await categoriesResponse.json() : undefined;

  return {
    categories: categoriesResponseJSON,
  };
};
