import type { PageLoad } from './$types';
import fetchRefresh from '$helpers/fetch-refresh';

export const load: PageLoad = async ({ fetch, parent }) => {
  const { user } = await parent();

  const followingRequest = fetchRefresh(fetch, '/api/spotify/me/following?type=artist&limit=6');

  let colorRequest;

  if (user?.images && user.images.length > 0) {
    colorRequest = fetchRefresh(
      fetch,
      `/api/average-color?${new URLSearchParams({
        image: user.images[0].url,
      }).toString()}`
    );
  }

  const [followingResponse, colorResponse] = await Promise.all([followingRequest, colorRequest]);

  return {
    color: colorResponse?.ok ? colorResponse.json().then((r) => r.color) : undefined,
    following: followingResponse.ok
      ? (followingResponse.json() as Promise<SpotifyApi.UsersFollowedArtistsResponse>)
      : undefined,
  };
};
