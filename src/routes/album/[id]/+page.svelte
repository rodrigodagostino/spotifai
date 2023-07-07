<script lang="ts">
  import { camelCase, startCase } from 'lodash'

  import type { PageData } from './$types'
  import getCopyrightSymbol from '$components/helpers/copyright-symbol'
  import ItemPage from '$components/ItemPage.svelte'
  import { IconClock } from '@tabler/icons-svelte'

  export let data: PageData

  $: album = data.album
  $: color = data.color

  const getDurationFromMs = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds
  }
</script>

<ItemPage
  title={album.name}
  type={startCase(camelCase(album.album_type))}
  {color}
  image={album.images.length ? album.images[0].url : undefined}
>
  <p class="album__meta" slot="meta">
    <span class="album__artists">{album.artists.map((artist) => artist.name).join(', ')}</span>
    <span class="album__date">{new Date(album.release_date).getFullYear()}</span>
    <span class="album__total-tracks">
      {album.total_tracks}
      {album.total_tracks === 1 ? 'song' : 'songs'}
    </span>
  </p>
  <div class="album__labels">
    <div class="album__labels__column">
      <span class="album__labels__number-label">#</span>
    </div>
    <div class="album__labels__column">
      <span class="album__labels__name-label">Title</span>
    </div>
    <div class="album__labels__column">
      <span class="album__labels__duration-label"><IconClock size={18} /></span>
    </div>
  </div>
  <ul class="album__tracks">
    {#each album.tracks.items as track}
      <li class="album__track">
        <div class="album__track__column">
          <span class="album__track__number">{track.track_number}</span>
        </div>
        <div class="album__track__column">
          <span class="album__track__name">{track.name}</span>
          <span class="album__track__artists">
            {#each track.artists as artist}
              <span class="album__track__artist">{artist.name}</span>
            {/each}
          </span>
        </div>
        <div class="album__track__column">
          <span class="album__track__duration">
            {getDurationFromMs(track.duration_ms)}
          </span>
        </div>
      </li>
    {/each}
  </ul>
  <div class="album__credits">
    <p class="album__release-date">
      {new Date(album.release_date).toLocaleDateString('en', { dateStyle: 'medium' })}
    </p>
    {#each album.copyrights as copyright}
      <p class="album__copyright">{getCopyrightSymbol(copyright.type)}{copyright.text}</p>
    {/each}
  </div>
</ItemPage>

<style lang="scss">
  .album {
    &__meta {
      display: flex;

      * + * {
        &::before {
          content: '•';
          margin: 0 0.325em;
        }
      }
    }

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

      &__name {
      }

      &__artists {
        font-size: 0.8125rem;
        color: var(--gray-300);
      }

      &__duration {
        color: var(--gray-300);
      }
    }

    &__credits {
      margin-top: 2rem;
      color: var(--gray-300);
    }

    &__release-date {
      font-size: 0.8125rem;
    }

    &__copyright {
      font-size: 0.75rem;
    }
  }
</style>
