<script lang="ts">
  import { IconCaretRightFilled } from '@tabler/icons-svelte';

  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import { addToast } from '$stores/toasts';
  import Button from './Button.svelte';

  export let track: SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
  export let userPlaylists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
  export let isOwner: boolean;
  export let position: 'right top' | 'left center' | { x: string; y: string } = 'right top';
  export let isHidden: boolean;

  let tracksBeingAddedToPlaylist: string[] = [];
  let tracksBeingRemovedFromPlaylist: string[] = [];
</script>

{#if userPlaylists}
  <ul
    class="track-list-item__menu"
    class:position-right-top={position === 'right top'}
    class:position-left-center={position === 'left center'}
    style={typeof position !== 'string' ? `left: ${position.x}; top: ${position.y}` : null}
    aria-hidden={isHidden}
  >
    <li class="track-list-item__menu__item has-submenu">
      <span>
        Add to playlist
        <IconCaretRightFilled size={16} />
      </span>
      <ul class="track-list-item__submenu">
        {#each userPlaylists as playlist}
          <li class="track-list-item__submenu__item">
            <form
              method="POST"
              action="/playlist/{playlist.id}?/addTrack&redirect={$page.url.pathname}"
              use:enhance={({ cancel }) => {
                isHidden = true;
                if (tracksBeingAddedToPlaylist.includes(track.id)) cancel();
                tracksBeingAddedToPlaylist = [...tracksBeingAddedToPlaylist, track.id];
                return ({ result }) => {
                  if (result.type === 'error') {
                    addToast('error', result.error.message);
                  }
                  if (result.type === 'redirect') {
                    const url = new URL(`${$page.url.origin}${result.location}`);
                    const successMessage = url.searchParams.get('success');
                    const errorMessage = url.searchParams.get('error');
                    if (successMessage) addToast('success', successMessage);
                    if (errorMessage) addToast('error', errorMessage);
                    invalidateAll();
                  }
                  tracksBeingAddedToPlaylist = tracksBeingAddedToPlaylist.filter(
                    (id) => id !== track.id
                  );
                };
              }}
            >
              <input hidden value={track.id} name="track-id" />
              <Button
                element="button"
                variant="ghost"
                aria-label="Add {track.name} to {playlist.name} playlist"
                disabled={tracksBeingAddedToPlaylist.includes(track.id)}
              >
                {playlist.name}
              </Button>
            </form>
          </li>
        {/each}
      </ul>
    </li>
    {#if isOwner}
      <li class="track-list-item__menu__item">
        <form
          method="POST"
          action="/playlist/{$page.params.id}?/removeTrack"
          use:enhance={({ cancel }) => {
            if (tracksBeingRemovedFromPlaylist.includes(track.id)) cancel();
            tracksBeingRemovedFromPlaylist = [...tracksBeingRemovedFromPlaylist, track.id];
            return async ({ result }) => {
              if (result.type === 'error') {
                addToast('error', result.error.message);
              }
              if (result.type === 'redirect') {
                const url = new URL(`${$page.url.origin}${result.location}`);
                const successMessage = url.searchParams.get('success');
                const errorMessage = url.searchParams.get('error');
                if (successMessage) addToast('success', successMessage);
                if (errorMessage) addToast('error', errorMessage);
                invalidateAll();
              }
              tracksBeingRemovedFromPlaylist.filter((id) => id !== track.id);
            };
          }}
        >
          <input hidden value={track.id} name="track-id" />
          <Button
            element="button"
            variant="ghost"
            aria-label="Remove {track.name} from playlist"
            disabled={tracksBeingRemovedFromPlaylist.includes(track.id)}
          >
            Remove from playlist
          </Button>
        </form>
      </li>
    {/if}
  </ul>
{/if}

<style lang="scss">
  .track-list-item {
    &__menu,
    &__submenu {
      min-width: 12rem;
      padding: 0.25rem;
      border-radius: 0.25rem;
      background-color: var(--gray-850);
      box-shadow:
        0 0 1px rgba(0, 0, 0, 0.16),
        0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);

      &__item {
        border-radius: 0.125rem;
        position: relative;
        cursor: default;

        &:focus-within,
        &:hover {
          background-color: var(--gray-750);
        }
      }
    }

    &__menu {
      position: absolute;
      list-style: none;
      z-index: 500;

      &[aria-hidden='true'] {
        display: none;
      }

      &[aria-hidden='false'] {
        display: block;
      }

      &.position-right-top {
        top: 0;
        left: 100%;
      }

      &.position-left-center {
        top: 50%;
        right: 100%;
        left: auto;
        transform: translateY(-50%);

        .track-list-item__submenu {
          right: calc(100% - 0.25rem);
          left: auto;
        }
      }

      &__item {
        span,
        :global(.button) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.125rem;
          position: relative;
          font-size: 0.875rem;
          font-weight: initial;
          white-space: nowrap;
        }

        &:focus-within,
        &:hover {
          .track-list-item__submenu {
            display: block;
          }
        }

        &.has-submenu {
          & > span,
          & > :global(.button) {
            padding: 0.5rem 0.5rem 0.5rem 0.75rem;
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
      z-index: 1;
    }
  }
</style>
