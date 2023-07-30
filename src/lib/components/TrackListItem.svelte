<script lang="ts">
  import { onMount } from 'svelte';
  import {
    IconCaretRightFilled,
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
  } from '@tabler/icons-svelte';

  import { page } from '$app/stores';
  import { navigation, setActiveTrack, setPaused } from '$stores/navigation';
  import msToTime from '$helpers/ms-to-time';
  import Button from './Button.svelte';
  import playingAnimation from '$assets/images/playing-animation.gif';

  export let index: number;
  export let currentIndex: number;
  export let type:
    | SpotifyApi.AlbumObjectSimplified['album_type']
    | SpotifyApi.PlaylistBaseObject['type'];
  export let track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
  export let userPlaylists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
  export let isOwner: boolean;

  let trackRef: HTMLLIElement;
  let menuX = 0;
  let menuY = 0;
  let isHidden = true;

  $: if (currentIndex !== index) isHidden = true;

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    currentIndex = index;

    const menu = trackRef?.querySelector<HTMLUListElement>('.track-list-item__menu');
    const layerX = event.layerX;
    const layerY = event.layerY;

    if (!!track && !!menu) {
      menuX =
        layerX + menu.offsetWidth * 2 <= trackRef.offsetWidth ? layerX : layerX - menu.offsetWidth;
      menuY = layerY;
      isHidden = false;
    }
  };

  const handleClick = (event: MouseEvent) => {
    if (!trackRef || !trackRef.contains(event?.target as Node)) isHidden = true;
  };

  onMount(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    };
  });
</script>

<li
  bind:this={trackRef}
  class="track-list-item"
  class:is-active={track.id === $navigation.activeTrack?.id}
  class:is-paused={track.id === $navigation.activeTrack?.id && $navigation.paused}
  on:contextmenu={handleContextMenu}
>
  <div class="track-list-item__column">
    <span class="track-list-item__number">
      {type === 'album' && track.track_number ? track.track_number : index + 1}
    </span>
    {#if track.id === $navigation.activeTrack?.id && !$navigation.paused}
      <Button
        element="button"
        variant="icon-ghost"
        aria-label="Pause {track.name}"
        on:click={() => setPaused(true)}
      >
        <IconPlayerPauseFilled size={16} />
      </Button>
    {:else}
      <Button
        element="button"
        variant="icon-ghost"
        aria-label="Play {track.name}"
        on:click={() => setActiveTrack(track)}
      >
        <IconPlayerPlayFilled size={16} />
      </Button>
    {/if}
    <img class="track-list-item__animation" src={playingAnimation} alt="" />
  </div>
  <div class="track-list-item__column">
    <audio class="track-list-item__player" src={track.preview_url} controls />
    <div class="track-list-item__info">
      <span class="track-list-item__name">
        {track.name}
        {#if track.explicit}
          <span class="track-list-item__explicit">Explicit</span>
        {/if}
      </span>
      <div class="track-list-item__artists">
        {#each track.artists as artist, i}
          <a href="/artist/{artist.id}" class="track-list-item__artist">{artist.name}</a>
          {#if i < track.artists.length - 1}<span>,&nbsp;</span>{/if}
        {/each}
      </div>
    </div>
  </div>
  <div class="track-list-item__column">
    <span class="track-list-item__duration">
      {msToTime(track.duration_ms)}
    </span>
  </div>
  {#if userPlaylists}
    <ul
      class="track-list-item__menu"
      style="top: {menuY}px; left: {menuX}px"
      aria-hidden={isHidden}
    >
      <li>
        <span>
          Add to playlist
          <IconCaretRightFilled size={16} />
        </span>
        <ul class="track-list-item__submenu">
          {#each userPlaylists as playlist}
            <li>
              <form
                method="POST"
                action="/playlist/{playlist.id}?/addItem&redirect={$page.url.pathname}"
              >
                <input hidden value={track.id} name="track-id" />
                <Button element="button" variant="text">{playlist.name}</Button>
              </form>
            </li>
          {/each}
        </ul>
      </li>
    </ul>
  {/if}
</li>

<style lang="scss">
  .track-list-item {
    display: grid;
    grid-template-columns: 2rem 4fr 2.125rem;
    column-gap: 1.25rem;
    align-items: center;
    padding: 0.25rem 1rem 0.25rem 0.75rem;
    border-radius: 0.25rem;
    position: relative;

    &:focus-within,
    &:hover,
    &.is-active {
      background-color: hsla(0, 0%, 100%, 0.1);

      .track-list-item__number {
        display: none;

        & + :global(.button) {
          display: inline-flex;
        }
      }
    }

    &.is-active {
      &:not(:focus-within):not(:hover) {
        .track-list-item {
          &__number + :global(.button) {
            display: none;
          }
        }

        &:not(.is-paused) {
          .track-list-item {
            &__animation {
              display: inline-block;
            }
          }
        }
      }

      .track-list-item {
        &__number {
          color: var(--spotify-text);
        }

        &__name {
          color: var(--spotify-text);
        }
      }
    }

    &.is-paused {
      &:not(:focus-within):not(:hover) {
        .track-list-item {
          &__number {
            display: inline-block;
          }
        }
      }
    }

    &__column {
      display: grid;
      width: 100%;

      &:first-child,
      &:nth-child(3) {
        justify-items: center;
        align-items: center;
      }
    }

    &__number {
      grid-column: 1/1;
      grid-row: 1;
      color: var(--gray-300);

      & + :global(.button) {
        display: none;
        grid-column: 1/1;
        grid-row: 1;
      }
    }

    &__animation {
      display: none;
      grid-column: 1/1;
      grid-row: 1;
      width: 1.25rem;
    }

    &__menu,
    &__submenu {
      min-width: 12rem;
      padding: 0.25rem;
      border-radius: 0.25rem;
      background-color: var(--gray-850);
      box-shadow:
        0 0 1px rgba(0, 0, 0, 0.16),
        0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
    }

    &__menu {
      position: absolute;
      list-style: none;
      z-index: 1;

      &[aria-hidden='true'] {
        display: none;
      }

      &[aria-hidden='false'] {
        display: block;
      }

      li {
        span,
        :global(.button) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0.5rem 0.5rem 0.75rem;
          border-radius: 0.125rem;
          white-space: nowrap;
          position: relative;
        }

        &:focus-within,
        &:hover {
          background-color: var(--gray-750);

          .track-list-item__submenu {
            display: block;
          }
        }
      }
    }

    &__submenu {
      display: none;
      position: absolute;
      top: 50%;
      left: calc(100% - 0.25rem);
      transform: translateY(-50%);
      list-style: none;
    }

    &__explicit {
      padding: 0 0.25rem;
      margin-left: 0.25rem;
      border: 1px solid var(--gray-300);
      border-radius: 0.25rem;
      vertical-align: middle;
      font-size: 0.625rem;
      color: var(--gray-300);
      text-transform: uppercase;
    }

    &__artists {
      display: flex;
      flex-wrap: wrap;
      font-size: 0.8125rem;
      color: var(--gray-300);
    }

    &__artist {
      color: var(--gray-300);
      text-decoration: none;

      &:focus,
      &:hover {
        color: var(--white);
        text-decoration: underline;
      }
    }

    &__player {
      display: none;
    }

    &__duration {
      color: var(--gray-300);
    }
  }

  :global(.no-js) {
    .track-list-item {
      &:focus-within,
      &:hover,
      &.is-active {
        .track-list-item__number {
          opacity: 1;

          & + :global(.button) {
            opacity: 0;
          }
        }
      }

      &__column:nth-child(2) {
        flex-direction: row;
        align-items: center;
        gap: 1rem;
      }

      &__player {
        display: initial;
        max-width: 32%;
      }
    }
  }
</style>
