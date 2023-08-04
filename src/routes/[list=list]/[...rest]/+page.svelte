<script lang="ts">
  import type { PageData } from './$types';
  import Grid from '$components/Grid.svelte';
  import Card from '$components/Card.svelte';
  import Pagination from '$components/Pagination.svelte';
  import { addToast } from '$stores/toasts';

  export let data: PageData;

  $: itemsData = data.data;

  let isLoadingMore = false;

  const onLoadMore = async () => {
    if (itemsData && 'next' in itemsData && itemsData.next) {
      isLoadingMore = true;
      const response = await fetch(
        itemsData.next.replace('https://api.spotify.com/v1/', '/api/spotify/')
      );
      if (response.ok) {
        const responseJSON = await response.json();
        const newData =
          responseJSON.albums || responseJSON.playlists || responseJSON.artists || responseJSON;
        itemsData = { ...newData, items: [...itemsData.items, ...newData.items] };
      } else {
        addToast('error', 'Could not load data.');
      }
      isLoadingMore = false;
    }
  };
</script>

<div class="list-page">
  <header class="list-page__header">
    <h1 class="list-page__title">{data.title}</h1>
  </header>
  {#if itemsData && itemsData.items.length > 0}
    <Grid>
      {#each itemsData.items as item}
        <Card {item} />
      {/each}
    </Grid>
    {#if 'next' in itemsData}
      <Pagination paginatedList={itemsData} {isLoadingMore} on:loadMore={onLoadMore} />
    {/if}
  {/if}
</div>

<style lang="scss">
  .list-page {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
