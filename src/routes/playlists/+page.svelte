<script>
  import { IconPlus } from '@tabler/icons-svelte';

  import Button from '$components/Button.svelte';
  import Card from '$components/Card.svelte';

  export let data;

  $: playlists = data.playlists;
</script>

<div class="playlists-page">
  <header class="playlists-page__header">
    <h1 class="playlists-page__title">Your playlists</h1>
    <Button element="a" href="/playlists" variant="secondary-outline">
      <IconPlus size={18} />
      Add new
    </Button>
  </header>
  {#if playlists.items.length > 0}
    <div class="playlists-page__content">
      {#each playlists.items as playlist (playlist.id)}
        <Card item={playlist} />
      {/each}
    </div>
  {:else}
    <div class="playlists-page__no-playlists">
      <h2>You have not created any playlist yet.</h2>
    </div>
  {/if}
</div>

<style lang="scss">
  .playlists-page {
    &__header {
      display: flex;
      justify-content: space-between;
    }

    &__content {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1.25rem;
      margin-top: 2rem;
    }

    &__no-playlists {
      padding-top: 2rem;
      text-align: center;
    }
  }

  @media (min-width: 28rem) {
    .playlists-page {
      &__content {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 42rem) {
    .playlists-page {
      &__content {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 50rem) {
    .playlists-page {
      &__content {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 62.5rem) {
    .playlists-page {
      &__content {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 76rem) {
    .playlists-page {
      &__content {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 90rem) {
    .playlists-page {
      &__content {
        grid-template-columns: repeat(5, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 100rem) {
    .playlists-page {
      &__content {
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }
    }
  }
</style>
