import { writable } from 'svelte/store';

interface INavigation {
  isMenuOpen: boolean;
  activeTrack: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified | null;
  paused: boolean;
}

export const navigation = writable<INavigation>({
  isMenuOpen: false,
  activeTrack: null,
  paused: true,
});

export const setIsMenuOpen = (value: INavigation['isMenuOpen']) => {
  navigation.update((state) => ({
    ...state,
    isMenuOpen: value,
  }));
};

export const setActiveTrack = (value: INavigation['activeTrack']) => {
  navigation.update((state) => ({
    ...state,
    activeTrack: value,
    paused: true,
  }));
  setTimeout(() => setPaused(false), 0);
};

export const setPaused = (value: INavigation['paused']) => {
  navigation.update((state) => ({
    ...state,
    paused: value,
  }));
};
