import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

const fetchRefresh = async (
  fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
  path: string
) => {
  const request = fetch(path);
  if (!browser) return request;

  const response = await request;
  if (response.status === 401) {
    if (!window.refreshPromise) {
      window.refreshPromise = fetch('/api/auth/refresh').finally(() => {
        window.refreshPromise = null;
      });
    }
    const refreshResponse = await window.refreshPromise;
    if (!refreshResponse.ok) throw error(401, 'Session expired!');
    return fetch(path);
  } else {
    return response;
  }
};

export default fetchRefresh;
