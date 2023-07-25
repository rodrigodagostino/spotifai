import { SPOTIFY_BASE_URL } from '$env/static/private';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ fetch, request, cookies }) => {
    const data = await request.formData();

    const name = data.get('name');
    const description = data.get('description');
    const userId = data.get('userId');

    if (!name) {
      return fail(400, {
        name,
        description,
        nameError: 'Playlist name is required.',
        apiError: false,
      });
    }

    const response = await fetch(`${SPOTIFY_BASE_URL}/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cookies.get('access_token')}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });

    if (!response.ok) {
      const errorJSON = await response.json();
      return fail(response.status, {
        name,
        description,
        apiError: errorJSON?.error?.message ?? 'An error has occured',
        nameError: false,
      });
    } else {
      const responseJSON: SpotifyApi.CreatePlaylistResponse = await response.json();
      throw redirect(303, `/playlist/${responseJSON.id}`);
    }
  },
};
