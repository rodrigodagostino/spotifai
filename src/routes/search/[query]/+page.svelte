<script lang="ts">
  import Card from '$components/Card.svelte';
  import Grid from '$components/Grid.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: albums = data.results.albums?.items;
  $: playlists = data.results.playlists?.items;
  $: artists = data.results.artists?.items;
</script>

<div class="playlists-page">
  <header class="search-results-page__header">
    <h1 class="search-results-page__title sr-only">Search results</h1>
  </header>

  {#if (!albums || albums.length === 0) && (!playlists || playlists.length === 0) && (!artists || artists.length === 0)}
    <section class="search-results-page__section">
      <header class="search-results-page__section__header">
        <h2 class="search-results-page__section__title">No results were found</h2>
      </header>
    </section>
  {/if}

  {#if albums && albums?.length > 0}
    <section class="search-results-page__section">
      <header class="search-results-page__section__header">
        <h2 class="search-results-page__section__title">Albums</h2>
      </header>
      <Grid>
        {#each albums as item}
          <Card {item} />
        {/each}
      </Grid>
    </section>
  {/if}

  {#if playlists && playlists?.length > 0}
    <section class="search-results-page__section">
      <header class="search-results-page__section__header">
        <h2 class="search-results-page__section__title">Playlists</h2>
      </header>
      <Grid>
        {#each playlists as item}
          <Card {item} />
        {/each}
      </Grid>
    </section>
  {/if}

  {#if artists && artists?.length > 0}
    <section class="search-results-page__section">
      <header class="search-results-page__section__header">
        <h2 class="search-results-page__section__title">Artists</h2>
      </header>
      <Grid>
        {#each artists as item}
          <Card {item} />
        {/each}
      </Grid>
    </section>
  {/if}
</div>

<style lang="scss">
  .search-results-page {
    &__section {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;

      & + & {
        margin-top: 2rem;
      }
    }
  }
</style>
