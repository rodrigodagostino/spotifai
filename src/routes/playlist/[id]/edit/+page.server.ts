import { SPOTIFY_BASE_URL } from '$env/static/private';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ fetch, request, cookies, url, params }) => {
    const data = await request.formData();

    const name = data.get('name');
    const description = data.get('description');

    if (!name) {
      return fail(400, {
        name,
        description,
        nameError: 'Playlist name is required.',
        apiError: false,
        editForm: true,
      });
    }

    const response = await fetch(`${SPOTIFY_BASE_URL}/playlists/${params.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cookies.get('access_token')}`,
      },
      body: JSON.stringify({
        name,
        description: description || undefined,
      }),
    });

    if (!response.ok) {
      const errorJSON = await response.json();
      return fail(response.status, {
        name,
        description,
        apiError: errorJSON?.error?.message ?? 'An error has occured',
        nameError: false,
        editForm: true,
      });
    } else {
      if (url.searchParams.has('redirect')) throw redirect(303, `/playlist/${params.id}`);
    }
  },
};
