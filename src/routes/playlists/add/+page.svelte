<script lang="ts">
  import PlaylistForm from '$components/PlaylistForm.svelte';

  export let data;
  export let form;
</script>

<div class="add-playlist-page">
  <header class="add-playlist-page__header">
    <h1>Add a new playlist</h1>
  </header>
  <div class="add-playlist-page__content">
    <PlaylistForm userId={data.user?.id} {form} />
  </div>
</div>

<style lang="scss">
  .add-playlist-page {
    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;
    }
  }
</style>
