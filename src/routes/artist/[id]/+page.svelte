<script lang="ts">
  import type { PageData } from './$types';
  import ItemPage from '$components/ItemPage.svelte';
  import formatFollowers from '$helpers/format-followers';
  import TrackList from '$components/TrackList.svelte';
  import Card from '$components/Card.svelte';
  import CardList from '$components/CardList.svelte';
  import Button from '$components/Button.svelte';

  export let data: PageData;

  $: artist = data.artist;
  $: topTracks = data.topTracks;
  $: albums = data.albums;
  $: appearsOn = data.appearsOn;
  $: relatedArtists = data.relatedArtists;
  $: color = data.color;
</script>

<ItemPage
  type={artist?.type}
  title={artist?.name || ''}
  image={artist?.images && artist?.images.length > 0 ? artist?.images[0].url : undefined}
  {color}
>
  <p slot="meta" class="artist-page__meta">
    <span class="artist-page__followers">
      {formatFollowers.format(artist.followers.total)} followers
    </span>
  </p>

  {#if topTracks.tracks.length > 0}
    <section class="artist-page__section">
      <header class="artist-page__section__header">
        <h2 class="artist-page__section__title">Popular</h2>
      </header>
      <div class="artist-page__section__content">
        <TrackList
          type="compilation"
          tracks={topTracks?.tracks}
          userPlaylists={data.userPlaylists?.filter(
            (playlist) => playlist.owner.id === data.user?.id
          )}
        />
      </div>
    </section>
  {/if}

  {#if albums.items.length > 0}
    <section class="artist-page__section">
      <header class="artist-page__section__header">
        <h2 class="artist-page__section__title">Discography</h2>
        <Button element="a" href="/artist/{artist.id}/albums" variant="secondary-outline">
          View all
          <span class="sr-only">albums</span>
        </Button>
      </header>
      <CardList>
        {#each albums.items as item}
          <Card {item} />
        {/each}
      </CardList>
    </section>
  {/if}

  {#if appearsOn.items.length > 0}
    <section class="artist-page__section">
      <header class="artist-page__section__header">
        <h2 class="artist-page__section__title">Featuring {artist.name}</h2>
        <Button element="a" href="/artist/{artist.id}/appears-on" variant="secondary-outline">
          View all
          <span class="sr-only">appearances</span>
        </Button>
      </header>
      <CardList>
        {#each appearsOn.items as item}
          <Card {item} />
        {/each}
      </CardList>
    </section>
  {/if}

  {#if relatedArtists.artists.length > 0}
    <section class="artist-page__section">
      <header class="artist-page__section__header">
        <h2 class="artist-page__section__title">Fans also like</h2>
        <Button element="a" href="/artist/{artist.id}/related-artists" variant="secondary-outline">
          View all
          <span class="sr-only">related artists</span>
        </Button>
      </header>
      <CardList>
        {#each relatedArtists.artists as item}
          <Card {item} />
        {/each}
      </CardList>
    </section>
  {/if}
</ItemPage>

<style lang="scss">
  .artist-page {
    &__meta {
      margin-top: 0.5rem;
    }

    &__section {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      & + & {
        margin-top: 2rem;
      }
    }

    &__section__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
