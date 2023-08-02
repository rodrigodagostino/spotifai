import fetchRefresh from '$helpers/fetch-refresh';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, parent }) => {
  const { user } = await parent();

  const newReleases = fetchRefresh(fetch, 'api/spotify/browse/new-releases?limit=7');
  const featuredPlaylists = fetchRefresh(fetch, '/api/spotify/browse/featured-playlists?limit=7');
  const userPlaylists = fetchRefresh(fetch, `/api/spotify/users/${user?.id}/playlists?limit=7`);

  const categoriesResponse = await fetchRefresh(fetch, '/api/spotify/browse/categories');
  const categoriesResponseJSON: SpotifyApi.MultipleCategoriesResponse | undefined =
    categoriesResponse.ok ? await categoriesResponse.json() : undefined;

  const randomCategories = categoriesResponseJSON
    ? categoriesResponseJSON.categories.items.sort(() => 0.5 - Math.random()).slice(0, 3)
    : [];
  const randomCategoriesPromises = randomCategories.map((category) =>
    fetchRefresh(fetch, `/api/spotify/browse/categories/${category.id}/playlists?limit=7`)
  );

  const [
    newReleasesResponse,
    featuredPlaylistsResponse,
    userPlaylistsResponse,
    ...randomCategoriesResponses
  ] = await Promise.all([
    newReleases,
    featuredPlaylists,
    userPlaylists,
    ...randomCategoriesPromises,
  ]);

  return {
    newReleases: newReleasesResponse.ok
      ? (newReleasesResponse.json() as Promise<SpotifyApi.ListOfNewReleasesResponse>)
      : undefined,
    featuredPlaylists: featuredPlaylistsResponse.ok
      ? (featuredPlaylistsResponse.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse>)
      : undefined,
    userPlaylists: userPlaylistsResponse.ok
      ? (userPlaylistsResponse.json() as Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>)
      : undefined,
    randomCategories: randomCategories as SpotifyApi.CategoryObject[],
    randomCategoriesPlaylists: Promise.all(
      randomCategoriesResponses.map((response) =>
        response.ok ? (response.json() as Promise<SpotifyApi.CategoryPlaylistsResponse>) : undefined
      )
    ),
  };
};
