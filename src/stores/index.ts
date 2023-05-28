import { writable } from 'svelte/store'

interface IStore {
  isMenuOpen: boolean
}

export const store = writable<IStore>({
  isMenuOpen: false,
})

export const setIsMenuOpen = (value: IStore['isMenuOpen']) => {
  store.update((state) => ({
    ...state,
    isMenuOpen: value,
  }))
}
