<script lang="ts">
  import { IconClock } from '@tabler/icons-svelte';

  import TrackListItem from './TrackListItem.svelte';

  export let type:
    | SpotifyApi.AlbumObjectSimplified['album_type']
    | SpotifyApi.PlaylistBaseObject['type'];
  export let tracks: SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[];
  export let userPlaylists: SpotifyApi.PlaylistObjectSimplified[] | undefined;
  export let isOwner = false;

  let currentIndex: number;
</script>

<div class="track-list__labels">
  <div class="track-list__labels__column">
    <span class="track-list__labels__number-label">#</span>
  </div>
  <div class="track-list__labels__column">
    <span class="track-list__labels__name-label">Title</span>
  </div>
  <div class="track-list__labels__column">
    <span class="track-list__labels__duration-label"><IconClock size={18} /></span>
  </div>
</div>
<ul class="track-list__items">
  {#each tracks as track, index}
    <TrackListItem {index} bind:currentIndex {type} {track} {userPlaylists} {isOwner} />
  {/each}
</ul>

<style lang="scss">
  .track-list {
    &__labels {
      display: grid;
      grid-template-columns: 2rem 4fr 2.125rem 2.25rem;
      column-gap: 0.75rem;
      align-items: center;
      padding: 0.25rem 1rem 0.25rem 0.75rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);

      &__column {
        display: flex;
        flex-direction: column;
        width: 100%;

        &:first-child,
        &:last-child {
          align-items: center;
        }
      }

      &__number-label,
      &__name-label,
      &__duration-label {
        font-size: 0.875rem;
        color: var(--gray-300);
      }
    }

    &__items {
      list-style: none;
    }
  }
</style>
