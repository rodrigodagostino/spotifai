<script lang="ts">
  import { camelCase, startCase } from 'lodash'

  import type { PageData } from './$types'
  import getCopyrightSymbol from '$components/helpers/copyright-symbol'
  import ItemPage from '$components/ItemPage.svelte'
  import TrackList from '$components/TrackList.svelte'

  export let data: PageData

  $: album = data.album
  $: color = data.color
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
  <TrackList tracks={album.tracks.items} />
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
