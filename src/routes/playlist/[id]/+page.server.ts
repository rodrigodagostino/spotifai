import { fail, type Actions } from '@sveltejs/kit';
import { SPOTIFY_BASE_URL } from '$env/static/private';

export const actions: Actions = {
  followPlaylist: async ({ cookies, params, fetch }) => {
    const response = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params.id}/followers`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cookies.get('access_token')}`,
      },
    });
    if (!response.ok) return fail(response.status, { followError: response.statusText });
  },

  unfollowPlaylist: async ({ cookies, params, fetch }) => {
    const response = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params.id}/followers`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${cookies.get('access_token')}`,
      },
    });
    if (!response.ok) return fail(response.status, { followError: response.statusText });
  },
};
