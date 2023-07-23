import { get, writable } from 'svelte/store';
import { uniqueId } from 'lodash';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export const toasts = writable<Toast[]>([]);

export const addToast = (
  type: Toast['type'],
  message: Toast['message'],
  timeout: number = 4000
) => {
  const toastId = uniqueId();

  toasts.update((currData) => [
    ...currData,
    {
      id: toastId,
      type,
      message,
    },
  ]);

  if (timeout) {
    setTimeout(() => removeToast(toastId), timeout);
  }
};

export const removeToast = (id: Toast['id']) => {
  const $toasts = get(toasts);
  if ($toasts.some((toast) => toast.id === id)) {
    toasts.update((currData) => currData.filter((item) => item.id !== id));
  }
};
