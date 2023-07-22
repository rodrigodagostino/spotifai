<script lang="ts">
  import type { PageData } from './$types'
  import getCopyrightSymbol from '$helpers/copyright-symbol'
  import ItemPage from '$components/ItemPage.svelte'
  import TrackList from '$components/TrackList.svelte'

  export let data: PageData

  $: album = data.album
  $: color = data.color
</script>

<ItemPage
  image={album.images.length > 0 ? album.images[0].url : undefined}
  {color}
  type={album.album_type}
  title={album.name}
>
  <p class="album__meta" slot="meta">
    <span class="album__artists">{album.artists.map((artist) => artist.name).join(', ')}</span>
    <span class="album__date">{new Date(album.release_date).getFullYear()}</span>
    <span class="album__total-tracks">
      {album.total_tracks}
      {album.total_tracks === 1 ? 'song' : 'songs'}
    </span>
  </p>
  <TrackList tracks={album.tracks.items} type={album.type} />
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
      justify-content: center;
      margin-top: 1rem;

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

  @media (min-width: 50rem) {
    .album {
      &__meta {
        justify-content: initial;
        margin-top: 2rem;
      }
    }
  }
</style>
