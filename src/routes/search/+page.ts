import fetchRefresh from '$helpers/fetch-refresh';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
  const query = url.searchParams.get('q');
  if (query) throw redirect(307, `/search/${query}`);

  const categoriesResponse = await fetchRefresh(fetch, '/api/spotify/browse/categories?limit=50');
  const categoriesResponseJSON: SpotifyApi.MultipleCategoriesResponse | undefined =
    categoriesResponse.ok ? await categoriesResponse.json() : undefined;

  return {
    categories: categoriesResponseJSON,
  };
};
