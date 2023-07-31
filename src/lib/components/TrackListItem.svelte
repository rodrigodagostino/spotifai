<script lang="ts">
  import { onMount } from 'svelte';
  import {
    IconDots,
    IconMusic,
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
  } from '@tabler/icons-svelte';

  import { navigation, setActiveTrack, setPaused } from '$stores/navigation';
  import msToTime from '$helpers/ms-to-time';
  import Button from './Button.svelte';
  import playingAnimation from '$assets/images/playing-animation.gif';
  import TrackListItemMenu from './TrackListItemMenu.svelte';

  export let index: number;
  export let currentIndex: number;
  export let type:
    | SpotifyApi.AlbumObjectSimplified['album_type']
    | SpotifyApi.PlaylistBaseObject['type'];
  export let track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
  export let userPlaylists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
  export let isOwner: boolean;

  let trackRef: HTMLLIElement;
  let contextMenuPosition: { x: string; y: string } = { x: '0', y: '0' };
  let isActionsMenuHidden = true;
  let isContextMenuHidden = true;

  $: if (currentIndex !== index) isContextMenuHidden = true;

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    currentIndex = index;

    const layerX = event.layerX;
    const layerY = event.layerY;

    if (!!track) {
      contextMenuPosition = {
        x: `${layerX}px`,
        y: `${layerY}px`,
      };
      isContextMenuHidden = false;
    }
  };

  const handleClick = (event: MouseEvent) => {
    if (!trackRef || !trackRef.contains(event?.target as Node)) {
      isContextMenuHidden = true;
      isActionsMenuHidden = true;
    }
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
      {#if track.album.images.length > 0}
        <img class="track-list-item__image" src={track.album.images[0].url} alt={track.name} />
      {:else}
        <div class="track-list-item__image-placeholder">
          <IconMusic size={24} />
        </div>
      {/if}
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
  <div class="track-list-item__column">
    <Button
      element="button"
      variant="icon-ghost"
      on:click={() => (isActionsMenuHidden = !isActionsMenuHidden)}
    >
      <IconDots size={20} />
    </Button>
    <TrackListItemMenu
      {track}
      {userPlaylists}
      {isOwner}
      position="left center"
      bind:isHidden={isActionsMenuHidden}
    />
  </div>
  <TrackListItemMenu
    {track}
    {userPlaylists}
    {isOwner}
    position={contextMenuPosition}
    bind:isHidden={isContextMenuHidden}
  />
</li>

<style lang="scss">
  .track-list-item {
    display: grid;
    grid-template-columns: 2rem 4fr 2.125rem 2.25rem;
    column-gap: 0.75rem;
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
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;

      &:nth-child(2) {
        align-items: initial;
      }

      &:nth-child(4) {
        position: relative;
      }
    }

    &__number {
      color: var(--gray-300);

      & + :global(.button) {
        display: none;
      }
    }

    &__animation {
      display: none;
      width: 1rem;
    }

    &__info {
      display: grid;
      grid-template-columns: 2.5rem auto;
      column-gap: 1rem;
      align-items: center;
    }

    &__image {
      grid-row: 1/3;
      border-radius: 0.25rem;
    }

    &__image-placeholder {
      grid-row: 1/3;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      aspect-ratio: 1;
      border-radius: 0.25rem;
      background-color: var(--gray-700);
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
          display: block;

          & + :global(.button) {
            display: none;
          }
        }
      }

      &__column:nth-child(2) {
        flex-direction: row;
        align-items: center;
        gap: 1rem;
      }

      &__column:nth-child(4) {
        &:focus-within :global(.track-list-item__menu) {
          display: block;
        }
      }

      &__player {
        display: initial;
        max-width: 32%;
        height: 2.5rem;
        border-radius: 1.25rem;
        background-color: black;
      }
    }
  }
</style>
