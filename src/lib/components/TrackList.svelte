<script lang="ts">
  import { IconClock } from '@tabler/icons-svelte'

  import msToTime from './helpers/ms-to-time'

  export let tracks: SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[]
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
<ul class="track-list__tracks">
  {#each tracks as track}
    <li class="track-list__track">
      <div class="track-list__track__column">
        <span class="track-list__track__number">{track.track_number}</span>
      </div>
      <div class="track-list__track__column">
        <span class="track-list__track__name">
          {track.name}
          {#if track.explicit}
            <span class="track-list__track__explicit">Explicit</span>
          {/if}
        </span>
        <span class="track-list__track__artists">
          {#each track.artists as artist}
            <a href="/artist/{artist.id}" class="track-list__track__artist">{artist.name}</a>
          {/each}
        </span>
      </div>
      <div class="track-list__track__column">
        <span class="track-list__track__duration">
          {msToTime(track.duration_ms)}
        </span>
      </div>
    </li>
  {/each}
</ul>

<style lang="scss">
  .track-list {
    &__labels {
      display: grid;
      grid-template-columns: 1rem 4fr minmax(7.5rem, 1fr);
      column-gap: 1rem;
      align-items: center;
      padding: 0.5rem 1rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);

      &__column {
        display: flex;
        flex-direction: column;

        &:first-child,
        &:last-child {
          justify-self: end;
        }
      }

      &__number-label,
      &__name-label,
      &__duration-label {
        font-size: 0.875rem;
        color: var(--gray-300);
      }
    }

    &__tracks {
      list-style: none;
    }

    &__track {
      display: grid;
      grid-template-columns: 1rem 4fr minmax(7.5rem, 1fr);
      column-gap: 1rem;
      align-items: center;
      padding: 0.25rem 1rem;
      border-radius: 0.25rem;

      &:focus,
      &:hover {
        background-color: hsla(0, 0%, 100%, 0.1);
      }

      &__column {
        display: flex;
        flex-direction: column;

        &:first-child,
        &:last-child {
          justify-self: end;
        }
      }

      &__number {
        color: var(--gray-300);
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

        & + & {
          &::before {
            content: ', ';
          }
        }
      }

      &__duration {
        color: var(--gray-300);
      }
    }
  }
</style>
