<script lang="ts">
  import MicroModal from 'micromodal';
  import { IconPlus } from '@tabler/icons-svelte';

  import { addToast } from '$stores/toasts';
  import type { ActionData } from './add/$types';
  import Grid from '$components/Grid.svelte';
  import Card from '$components/Card.svelte';
  import Button from '$components/Button.svelte';
  import Pagination from '$components/Pagination.svelte';
  import Modal from '$components/Modal.svelte';
  import PlaylistForm from '$components/PlaylistForm.svelte';

  export let data;
  export let form: ActionData;

  let isLoadingMore = false;

  $: playlists = data.playlists;

  const loadMore = async () => {
    if (!playlists.next) return;

    isLoadingMore = true;
    const response = await fetch(
      playlists.next.replace('https://api.spotify.com/v1/', '/api/spotify/')
    );
    const responseJSON = await response.json();
    if (response.ok) {
      playlists = {
        ...responseJSON,
        items: [...playlists.items, ...responseJSON.items],
      };
    } else {
      addToast('error', responseJSON.error.message || 'Could not load more tracks.');
    }
    isLoadingMore = false;
  };
</script>

<div class="playlists-page">
  <header class="playlists-page__header">
    <h1 class="playlists-page__title">Your playlists</h1>
    <Button
      element="a"
      href="/playlists/add"
      variant="secondary-outline"
      on:click={(e) => {
        e.preventDefault();
        MicroModal.show('add-playlist-modal');
      }}
    >
      <IconPlus size={18} />
      Add new
    </Button>
  </header>
  {#if playlists.items.length > 0}
    <Grid>
      {#each playlists.items as playlist (playlist.id)}
        <Card item={playlist} />
      {/each}
    </Grid>
    <Pagination paginatedList={playlists} {isLoadingMore} on:loadMore={loadMore} />
  {:else}
    <div class="playlists-page__no-playlists">
      <h2>You have not created any playlist yet.</h2>
    </div>
  {/if}
</div>

<Modal id="add-playlist-modal" title="Add a new playlist">
  <PlaylistForm {form} userId={data.user?.id} action="/playlists/add" />
</Modal>

<style lang="scss">
  .playlists-page {
    &__header {
      display: flex;
      justify-content: space-between;
    }

    &__no-playlists {
      padding-top: 2rem;
      text-align: center;
    }
  }
</style>
