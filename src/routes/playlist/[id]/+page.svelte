<script lang="ts">
  import type { PageData } from './$types'
  import ItemPage from '$components/ItemPage.svelte'
  import TrackList from '$components/TrackList.svelte'
  import Button from '$components/Button.svelte'

  export let data: PageData

  $: playlist = data.playlist
  $: color = data.color
  $: tracks = data.playlist.tracks

  let filteredTracks: SpotifyApi.TrackObjectFull[]

  $: {
    filteredTracks = []
    tracks.items.forEach((item) => {
      if (item.track) filteredTracks = [...filteredTracks, item.track]
    })
  }

  const formatFollowers = Intl.NumberFormat('en', {
    notation: 'compact',
  })
</script>

<ItemPage
  image={playlist.images.length > 0 ? playlist.images[0].url : undefined}
  {color}
  type={playlist.type}
  title={playlist.name}
>
  <p slot="description" class="playlist__description">{@html playlist.description}</p>
  <p slot="meta" class="playlist__meta">
    <span class="playlist__owner">{playlist.owner.display_name}</span>
    <span class="playlist__followers">{formatFollowers.format(playlist.followers.total)}</span>
    <span class="playlist__total-tracks">
      {playlist.tracks.total}
      {playlist.tracks.total === 1 ? 'song' : 'songs'}
    </span>
  </p>
  {#if tracks.items.length > 0}
    <TrackList tracks={filteredTracks} type={playlist.type} />
  {:else}
    <div class="playlist__no-tracks">
      <h2>No songs have been added to this playlist.</h2>
      <div class="playlist__buttons">
        <Button element="a" href="/search">Search for a different playlist</Button>
        <Button element="a" href="/playlists" variant="text">Go to your library</Button>
      </div>
    </div>
  {/if}
</ItemPage>

<style lang="scss">
  .playlist {
    &__description {
      margin-top: 1rem;
      color: var(--gray-300);
    }

    &__meta {
      display: flex;
      justify-content: center;
      margin-top: 0.5rem;

      * + * {
        &::before {
          content: '•';
          margin: 0 0.325em;
        }
      }
    }

    &__no-tracks {
      padding-top: 2rem;
      text-align: center;
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-top: 2rem;
    }
  }

  @media (min-width: 50rem) {
    .playlist {
      &__description {
        margin-top: 2rem;
      }

      &__meta {
        justify-content: initial;
      }
    }
  }
</style>
