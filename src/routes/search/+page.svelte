<script lang="ts">
  import type { PageData } from './$types';
  import Grid from '$components/Grid.svelte';

  export let data: PageData;

  $: categories = data.categories?.categories.items;
</script>

<div class="playlists-page">
  <header class="search-page__header">
    <h1 class="search-page__title sr-only">Search</h1>
  </header>
  {#if categories}
    <section class="search-page__section">
      <header class="search-page__section__header">
        <h2 class="search-page__section__title">Browse all</h2>
      </header>
      <Grid>
        {#each categories as category}
          <a class="search-page__category" href="/category/{category.id}">
            {#if category.icons.length > 0}
              <img src={category.icons[0].url} alt={category.name} />
            {/if}
            <h3 class="search-page__category__name">{category.name}</h3>
          </a>
        {/each}
      </Grid>
    </section>
  {/if}
</div>

<style lang="scss">
  .search-page {
    &__section {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    &__section__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__category {
      border-radius: 0.5rem;
      text-decoration: none;
      overflow: hidden;
      position: relative;
    }

    &__category__name {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 88%;
      height: 3rem;
      position: absolute;
      left: 50%;
      bottom: 8%;
      transform: translateX(-50%);
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.2;
      text-align: center;
    }
  }
</style>
