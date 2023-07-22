import type { PageLoad } from './$types'
import { error } from '@sveltejs/kit'
import fetchRefresh from '$helpers/fetch-refresh'

export const load: PageLoad = async ({ fetch: _fetch, params, depends, route, url, parent }) => {
  depends(`app:${route.id}`)
  const { user } = await parent()

  const fetch = (path: string) => fetchRefresh(_fetch, path)

  const limit = 100
  const page = url.searchParams.get('page')

  const [playlistResponse, isFollowingResponse] = await Promise.all([
    fetch(`/api/spotify/playlists/${params.id}`),
    fetch(
      `/api/spotify/playlists/${params.id}/followers/contains?${new URLSearchParams({
        ids: user ? user.id : '',
      }).toString()}`
    ),
  ])

  if (!playlistResponse.ok) throw error(playlistResponse.status, 'Failed to load playlist!')

  let isFollowing: boolean | null = null
  if (isFollowingResponse.ok) {
    const isFollowingJSON: SpotifyApi.UsersFollowPlaylistResponse = await isFollowingResponse.json()
    isFollowing = isFollowingJSON[0]
  }

  const playlistResponseJSON: SpotifyApi.SinglePlaylistResponse = await playlistResponse.json()

  if (page && page !== '1') {
    const tracksResponse = await fetch(
      `/api/spotify/playlists/${params.id}/tracks?${new URLSearchParams({
        limit: `${limit}`,
        offset: `${limit * (Number(page) - 1)}`,
      }).toString()}`
    )

    if (!tracksResponse.ok) throw error(tracksResponse.status, 'Failed to load playlist!')

    const tracksResponseJSON = await tracksResponse.json()
    playlistResponseJSON.tracks = tracksResponseJSON
  }

  let color = null
  if (playlistResponseJSON.images.length > 0) {
    const colorResponse = await fetch(
      `/api/average-color?${new URLSearchParams({
        image: playlistResponseJSON.images[0].url,
      }).toString()}`
    )
    if (colorResponse.ok) color = (await colorResponse.json()).color
  }

  return {
    playlist: playlistResponseJSON,
    title: playlistResponseJSON.name,
    color,
    isFollowing,
  }
}
