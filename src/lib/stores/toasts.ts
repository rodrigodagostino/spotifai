import { get, writable } from 'svelte/store';
import { uniqueId } from 'lodash';

export interface IToast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export const toasts = writable<IToast[]>([]);

export const addToast = (
  type: IToast['type'],
  message: IToast['message'],
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

export const removeToast = (id: IToast['id']) => {
  const $toasts = get(toasts);
  if ($toasts.some((toast) => toast.id === id)) {
    toasts.update((currData) => currData.filter((item) => item.id !== id));
  }
};
