import pkce from 'pkce-gen';

import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { BASE_URL, SPOTIFY_APP_CLIENT_ID } from '$env/static/private';

const scope =
  'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private';

const generateRandomString = (length: number) => {
  let randomString = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * length));
  }
  return randomString;
};

const state = generateRandomString(16);
const challenge = pkce.create();

export const GET: RequestHandler = ({ cookies }) => {
  cookies.set('spotify_auth_state', state);
  cookies.set('spotify_auth_challenge_code_verifier', challenge.code_verifier);

  throw redirect(
    307,
    `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: 'code',
      client_id: SPOTIFY_APP_CLIENT_ID,
      scope,
      redirect_uri: `${BASE_URL}/api/auth/callback`,
      state,
      code_challenge_method: 'S256',
      code_challenge: challenge.code_challenge,
    })}`
  );
};
