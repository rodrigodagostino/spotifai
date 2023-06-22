import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, parent }) => {
  const { user } = await parent()

  const newReleases = fetch('api/spotify/browse/new-releases?limit=6')
  const featuredPlaylists = fetch('api/spotify/browse/new-releases?limit=6')
  const userPlaylist = fetch(`/api/spotify/users/${user?.id}/playlists?limit=6`)

  const categoriesResponse = await fetch('/api/spotify/browse/categories')
  const categoriesResponseJSON: SpotifyApi.MultipleCategoriesResponse | undefined =
    categoriesResponse.ok ? await categoriesResponse.json() : undefined

  const randomCategories = categoriesResponseJSON
    ? categoriesResponseJSON.categories.items.sort(() => 0.5 - Math.random()).slice(0, 3)
    : []
  const randomCategoriesPromises = randomCategories.map((category) =>
    fetch(`/api/spotify/browse/categories/${category.id}/playlists?limit=6`)
  )

  const [
    newReleasesResponse,
    featuredPlaylistsResponse,
    userPlaylistResponse,
    ...randomCategoriesResponses
  ] = await Promise.all([newReleases, featuredPlaylists, userPlaylist, ...randomCategoriesPromises])

  return {
    newReleases: newReleasesResponse.ok
      ? (newReleasesResponse.json() as Promise<SpotifyApi.ListOfNewReleasesResponse>)
      : undefined,
    featuredPlaylists: featuredPlaylistsResponse.ok
      ? (featuredPlaylistsResponse.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse>)
      : undefined,
    userPlaylist: userPlaylistResponse.ok
      ? (userPlaylistResponse.json() as Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>)
      : undefined,
    randomCategories: randomCategories as SpotifyApi.CategoryObject[],
    randomCategoriesPlaylists: Promise.all(
      randomCategoriesResponses.map((response) =>
        response.ok ? (response.json() as Promise<SpotifyApi.CategoryPlaylistsResponse>) : undefined
      )
    ),
  }
}
