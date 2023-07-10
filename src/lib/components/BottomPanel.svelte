<script lang="ts">
  import {
    IconPlayerPauseFilled,
    IconPlayerPlayFilled,
    IconVolume,
    IconVolume2,
    IconVolume3,
  } from '@tabler/icons-svelte'

  import { setPaused, store } from '$stores'
  import Button from './Button.svelte'

  let currentTime: number = 0
  let duration: number = 0
  let volume: number = 0.5

  function formatTime(time: number, type: 'time' | 'duration') {
    if (isNaN(time)) return '...'

    const minutes = type === 'time' ? Math.floor(time / 60) : Math.round(time / 60)
    const seconds = type === 'time' ? Math.floor(time % 60) : Math.round(time % 60)

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }
</script>

<div class="bottom-panel">
  <div class="player">
    <div class="player__column">
      {#if $store.activeTrack}
        <span class="player__song-name">{$store.activeTrack?.name}</span>
        <div class="player__song-artists">
          {#each $store.activeTrack?.artists as artist, i}
            <a class="player__song-artist" href="/artist/{artist.id}">{artist.name}</a>
            {#if i < $store.activeTrack?.artists.length - 1}<span>,&nbsp;</span>{/if}
          {/each}
        </div>
      {/if}
    </div>
    <div class="player__column">
      <audio
        src={$store.activeTrack?.preview_url}
        bind:paused={$store.paused}
        bind:currentTime
        bind:duration
        bind:volume
      />
      <div class="player__play">
        <Button
          element="button"
          variant="icon-solid"
          aria-label={$store.paused ? 'Play song' : 'Pause song'}
          on:click={() => ($store.paused ? setPaused(false) : setPaused(true))}
        >
          {#if $store.paused}
            <IconPlayerPlayFilled size={18} />
          {:else}
            <IconPlayerPauseFilled size={18} />
          {/if}
        </Button>
      </div>
      <div class="player__progress">
        <span class="player__current-time">{formatTime(currentTime, 'time')}</span>
        <input
          class="player__track"
          type="range"
          bind:value={currentTime}
          min="0"
          max={duration.toFixed(0)}
        />
        <span class="player__duration">{duration ? formatTime(duration, 'duration') : '--:--'}</span
        >
      </div>
    </div>
    <div class="player__column">
      <div class="player__volume">
        {#if volume >= 0.8}
          <IconVolume size={18} />
        {:else if volume === 0}
          <IconVolume3 size={18} />
        {:else}
          <IconVolume2 size={18} />
        {/if}
        <input
          class="player__volume-track"
          type="range"
          bind:value={volume}
          min="0"
          max="1"
          step="0.05"
        />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .bottom-panel {
    grid-column: 1/-1;
    grid-row: 4;
  }

  .player {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1.25rem;
    align-items: center;
    padding: 0 0.5rem 0.5rem;

    &__column {
      display: flex;
      flex-direction: column;
      height: 100%;

      &:first-child {
        grid-column: 1;
        grid-row: 1;
        padding-right: 4rem;
      }

      &:nth-child(2) {
        grid-column: 1;
        grid-row: 1;
        align-items: end;
        justify-content: space-between;
        gap: 0.25rem;

        &::before {
          content: '';
          width: 0.25rem;
          height: 0.25rem;
        }
      }

      &:last-child {
        display: none;
        align-items: end;
      }
    }

    &__song-artists {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 1.25rem;
      font-size: 0.75rem;
      color: var(--gray-300);
    }

    &__song-artist {
      color: inherit;
      text-decoration: none;

      &:focus,
      &:hover {
        color: var(--white);
        text-decoration: underline;
      }
    }

    &__play {
      margin-bottom: 1rem;
    }

    &__progress {
      display: flex;
      width: 100%;
    }

    &__current-time,
    &__duration {
      display: none;
      font-size: 0.75rem;
      color: var(--gray-300);
    }

    &__current-time {
      justify-self: end;
    }

    &__track {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 0.25rem;
      margin: 0;
      border: none;
      border-radius: 0.5rem;
      background-color: var(--gray-300);

      &::-webkit-slider-thumb,
      &::-moz-range-thumb {
        -webkit-appearance: none;
        appearance: none;
        display: none;
        width: 0.75rem;
        height: 0.75rem;
        border: none;
        background-color: var(--white);
      }

      &::-moz-range-progress {
        appearance: none;
        border-radius: 0.25rem;
        background-color: var(--white);
      }

      &:hover {
        &::-webkit-slider-thumb,
        &::-moz-range-thumb {
          display: initial;
        }

        &::-moz-range-progress {
          background-color: var(--spotify-background);
        }
      }
    }

    &__volume {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    &__volume-track {
      -webkit-appearance: none;
      appearance: none;
      width: 5.75rem;
      height: 0.25rem;
      margin: 0;
      border: none;
      border-radius: 0.25rem;
      background-color: var(--gray-300);

      &::-webkit-slider-thumb,
      &::-moz-range-thumb {
        -webkit-appearance: none;
        appearance: none;
        display: none;
        width: 0.75rem;
        height: 0.75rem;
        border: none;
        background-color: var(--white);
      }

      &::-moz-range-progress {
        appearance: none;
        border-radius: 0.25rem;
        background-color: var(--white);
      }

      &:hover {
        &::-webkit-slider-thumb,
        &::-moz-range-thumb {
          display: initial;
        }

        &::-moz-range-progress {
          background-color: var(--spotify-background);
        }
      }
    }
  }

  @media (min-width: 50em) {
    .player {
      grid-template-columns: 3fr 4fr 3fr;

      &__column {
        height: initial;

        &:nth-child(2) {
          grid-column: 2;
          gap: 0.5rem;
          align-items: center;

          &::before {
            content: none;
          }
        }

        &:last-child {
          display: flex;
        }

        & > :global(.button) {
          margin: 1rem 0;
        }
      }

      &__song-artists {
        margin-bottom: initial;
      }

      &__play {
        margin-bottom: initial;
      }

      &__progress {
        display: grid;
        grid-template-columns: 1.75rem auto 1.75rem;
        gap: 0.5rem;
        align-items: center;
      }

      &__current-time,
      &__duration {
        display: initial;
      }
    }
  }
</style>
