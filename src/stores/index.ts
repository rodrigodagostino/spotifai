import { writable } from 'svelte/store'

interface IStore {
  isMenuOpen: boolean
  activeTrack: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified | null
  playerStatus: 'idle' | 'playing' | 'paused'
}

export const store = writable<IStore>({
  isMenuOpen: false,
  activeTrack: null,
  playerStatus: 'idle',
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
    playerStatus: 'idle',
  }))
}

export const setPlayerStatus = (value: IStore['playerStatus']) => {
  store.update((state) => ({
    ...state,
    playerStatus: value,
  }))
}
