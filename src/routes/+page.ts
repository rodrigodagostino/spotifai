import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
  await fetch('api/spotify/browse/new-releases?limit=6')
}
