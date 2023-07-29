<script lang="ts">
  import { page } from '$app/stores';
  import { IconMusic } from '@tabler/icons-svelte';

  export let playlists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
</script>

{#if playlists && playlists.length > 0}
  <nav class="side-panel-bottom">
    <ul class="side-panel-bottom__playlists">
      {#each playlists as playlist}
        <li
          class="side-panel-bottom__playlist"
          class:is-current={$page.url.pathname === `/playlist/${playlist.id}`}
        >
          <a class="side-panel-bottom__playlist__link" href="/playlist/{playlist.id}">
            {#if playlist.images.length > 0}
              <img
                class="side-panel-bottom__playlist__image"
                src={playlist.images[0].url}
                alt={playlist.name}
              />
            {:else}
              <div class="side-panel-bottom__playlist__image-placeholder">
                <IconMusic size={28} />
              </div>
            {/if}
            <p class="side-panel-bottom__playlist__title">{playlist.name}</p>
            <p class="side-panel-bottom__playlist__owner">{playlist.owner.display_name}</p>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}

<style lang="scss">
  .side-panel-bottom {
    grid-row: 2/3;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: var(--gray-950);
    overflow: auto;
    scrollbar-width: thin;

    &__playlists {
      list-style: none;
    }

    &__playlist {
      &.is-current {
        .side-panel-bottom__playlist__title {
          color: var(--spotify-text);
        }
      }

      &__link {
        display: grid;
        grid-template-columns: 3rem auto;
        column-gap: 0.75rem;
        padding: 0.5rem;
        border-radius: 0.25rem;
        text-decoration: none;

        &:focus,
        &:hover {
          background-color: var(--gray-800);
        }
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

      &__title {
        grid-column: 2;
        font-size: 0.9375rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      &__owner {
        grid-column: 2;
        font-size: 0.8125rem;
        color: var(--gray-300);
      }
    }
  }
</style>
