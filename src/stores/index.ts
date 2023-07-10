import { writable } from 'svelte/store'

interface IStore {
  isMenuOpen: boolean
  activeTrack: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified | null
  paused: boolean
}

export const store = writable<IStore>({
  isMenuOpen: false,
  activeTrack: null,
  paused: true,
})

export const setIsMenuOpen = (value: IStore['isMenuOpen']) => {
  store.update((state) => ({
    ...state,
    isMenuOpen: value,
  }))
}

export const setActiveTrack = (value: IStore['activeTrack']) => {
  store.update((state) => ({
    ...state,
    activeTrack: value,
    paused: true,
  }))
  setTimeout(() => setPaused(false), 0)
}

export const setPaused = (value: IStore['paused']) => {
  store.update((state) => ({
    ...state,
    paused: value,
  }))
}
