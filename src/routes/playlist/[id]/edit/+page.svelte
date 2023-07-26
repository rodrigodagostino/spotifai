<script lang="ts">
  import PlaylistForm from '$components/PlaylistForm.svelte';

  export let data;
  export let form;

  $: playlist = data.playlist;
</script>

<div class="edit-playlist-page">
  <header class="edit-playlist-page__header">
    <h1>Edit {data.playlist.name}</h1>
  </header>
  <div class="edit-playlist-page__content">
    <PlaylistForm userId={data.user?.id} {form} {playlist} action="?redirect" />
  </div>
</div>

<style lang="scss">
  .edit-playlist-page {
    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;
    }
  }
</style>
