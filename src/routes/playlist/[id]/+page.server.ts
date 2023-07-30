import { fail, type Actions, redirect } from '@sveltejs/kit';
import { SPOTIFY_BASE_URL } from '$env/static/private';

export const actions: Actions = {
  addItem: async ({ request, cookies, url, params }) => {
    const data = await request.formData();
    const trackId = data.get('track-id');
    const playlistId = params.id;
    const redirectTo = url.searchParams.get('redirect');

    const response = await fetch(`${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cookies.get('access_token')}`,
      },
      body: JSON.stringify({
        uris: [`spotify:track:${trackId}`],
      }),
    });

    if (!response.ok) {
      throw redirect(
        303,
        redirectTo
          ? `${redirectTo}?error=${response.statusText}`
          : `/playlist/${playlistId}?error=${response.statusText}`
      );
    }

    if (redirectTo) {
      throw redirect(303, `${redirectTo}?success=Track added successfully!`);
    } else {
      throw redirect(303, `/playlist/${playlistId}?success=Track added successfully!`);
    }
  },

  followPlaylist: async ({ cookies, params, fetch }) => {
    const response = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params.id}/followers`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cookies.get('access_token')}`,
      },
    });
    if (!response.ok)
      return fail(response.status, { followError: response.statusText, followForm: true });
  },

  unfollowPlaylist: async ({ cookies, params, fetch }) => {
    const response = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params.id}/followers`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${cookies.get('access_token')}`,
      },
    });
    if (!response.ok)
      return fail(response.status, { followError: response.statusText, followForm: true });
  },
};
