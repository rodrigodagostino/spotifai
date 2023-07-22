<script lang="ts">
  import { IconClock, IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-svelte'

  import Button from '$components/Button.svelte'
  import { setActiveTrack, setPaused, store } from '$stores'
  import msToTime from '$helpers/ms-to-time'
  import playingAnimation from '$assets/images/playing-animation.gif'

  export let tracks: SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[]
  export let type:
    | SpotifyApi.AlbumObjectSimplified['album_type']
    | SpotifyApi.PlaylistBaseObject['type']
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
  {#each tracks as track, i}
    <li
      class="track-list__track"
      class:is-active={track.id === $store.activeTrack?.id}
      class:is-paused={track.id === $store.activeTrack?.id && $store.paused}
    >
      <div class="track-list__track__column">
        <span class="track-list__track__number">
          {type === 'album' && track.track_number ? track.track_number : i + 1}
        </span>
        {#if track.id === $store.activeTrack?.id && !$store.paused}
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
        <img class="track-list__track__animation" src={playingAnimation} alt="" />
      </div>
      <div class="track-list__track__column">
        <audio class="track-list__track__player" src={track.preview_url} controls />
        <div class="track-list__track__info">
          <span class="track-list__track__name">
            {track.name}
            {#if track.explicit}
              <span class="track-list__track__explicit">Explicit</span>
            {/if}
          </span>
          <div class="track-list__track__artists">
            {#each track.artists as artist, i}
              <a href="/artist/{artist.id}" class="track-list__track__artist">{artist.name}</a>
              {#if i < track.artists.length - 1}<span>,&nbsp;</span>{/if}
            {/each}
          </div>
        </div>
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
      grid-template-columns: 1rem 4fr auto;
      column-gap: 1.25rem;
      align-items: center;
      padding: 0.5rem 1rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);

      &__column {
        display: flex;
        flex-direction: column;
        width: 100%;

        &:first-child,
        &:last-child {
          align-items: end;
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
      grid-template-columns: 1rem 4fr 2.125rem;
      column-gap: 1.25rem;
      align-items: center;
      padding: 0.25rem 1rem;
      border-radius: 0.25rem;

      &:focus-within,
      &:hover,
      &.is-active {
        background-color: hsla(0, 0%, 100%, 0.1);

        .track-list__track__number {
          opacity: 0;

          & + :global(.button) {
            opacity: 1;
          }
        }
      }

      &.is-active {
        &:not(:focus-within):not(:hover) {
          .track-list__track {
            &__number + :global(.button) {
              display: none;
            }
          }

          &:not(.is-paused) {
            .track-list__track {
              &__animation {
                display: inline-block;
              }
            }
          }
        }

        .track-list__track {
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
          .track-list__track {
            &__number {
              opacity: 1;
            }
          }
        }
      }

      &__column {
        display: flex;
        flex-direction: column;
        width: 100%;
        position: relative;

        &:first-child,
        &:last-child {
          align-items: end;
        }
      }

      &__number {
        color: var(--gray-300);

        & + :global(.button) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-40%, -50%);
          opacity: 0;
        }
      }

      &__animation {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
  }

  :global(.no-js) {
    .track-list {
      &__track {
        &:focus-within,
        &:hover,
        &.is-active {
          .track-list__track__number {
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
  }
</style>
