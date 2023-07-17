<script lang="ts">
  import { IconArrowLeft, IconArrowRight } from '@tabler/icons-svelte'

  import type { PageData } from './$types'
  import { page } from '$app/stores'
  import ItemPage from '$components/ItemPage.svelte'
  import TrackList from '$components/TrackList.svelte'
  import Button from '$components/Button.svelte'

  export let data: PageData

  $: playlist = data.playlist
  $: color = data.color
  $: tracks = data.playlist.tracks
  $: currentPageNumber = $page.url.searchParams.get('page') || 1

  let filteredTracks: SpotifyApi.TrackObjectFull[]
  let isLoadingMore = false

  $: {
    filteredTracks = []
    tracks.items.forEach((item) => {
      if (item.track) filteredTracks = [...filteredTracks, item.track]
    })
  }

  const formatFollowers = Intl.NumberFormat('en', {
    notation: 'compact',
  })

  const loadMore = async () => {
    if (!tracks.next) return

    isLoadingMore = true
    const response = await fetch(
      tracks.next.replace('https://api.spotify.com/v1/', '/api/spotify/')
    )
    const responseJSON = await response.json()
    if (response.ok) {
      tracks = {
        ...responseJSON,
        items: [...tracks.items, ...responseJSON.items],
      }
    } else {
      console.error(response.status, response.statusText)
    }
    isLoadingMore = false
  }
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
    {#if tracks.next}
      <div class="playlist__load-more">
        {#if !isLoadingMore}
          <Button
            element="button"
            variant="secondary-outline"
            disabled={isLoadingMore}
            on:click={loadMore}
          >
            Load more
          </Button>
        {:else}
          <div class="playlist__loading-animation">
            <span class="playlist__loading-animation__dot-one" />
            <span class="playlist__loading-animation__dot-two" />
            <span class="playlist__loading-animation__dot-three" />
          </div>
        {/if}
      </div>
    {/if}
    <div class="playlist__pagination">
      {#if tracks.previous}
        <Button
          element="a"
          href="{$page.url.pathname}?{new URLSearchParams({
            page: `${Number(currentPageNumber) - 1}`,
          }).toString()}"
          variant="secondary-outline"
        >
          <IconArrowLeft size={24} />
          Previous page
        </Button>
      {/if}
      {#if tracks.next}
        <Button
          element="a"
          href="{$page.url.pathname}?{new URLSearchParams({
            page: `${Number(currentPageNumber) + 1}`,
          }).toString()}"
          variant="secondary-outline"
        >
          Next page
          <IconArrowRight size={24} />
        </Button>
      {/if}
    </div>
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
  :global(.no-js) {
    .playlist {
      &__load-more {
        display: none;
      }

      &__pagination {
        display: block;
      }
    }
  }

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

    &__load-more,
    &__pagination {
      margin-top: 1.5rem;
      text-align: center;
    }

    &__pagination {
      display: none;
    }

    &__loading-animation {
      height: 2.8125rem;
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      align-items: center;

      &__dot-one,
      &__dot-two,
      &__dot-three {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.25rem;
        background-color: var(--white);
        animation: loading-animation 1s infinite linear;
      }

      &__dot-one {
        animation-delay: 0s;
      }

      &__dot-two {
        animation-delay: 0.1s;
      }

      &__dot-three {
        animation-delay: 0.2s;
      }
    }

    @keyframes loading-animation {
      0% {
        transform: translate3d(0, -1rem, 0);
        opacity: 0;
      }
      25%,
      50%,
      75% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
      }
      100% {
        transform: translate3d(0, 1rem, 0);
        opacity: 0;
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
