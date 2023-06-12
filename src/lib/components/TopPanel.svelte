<script lang="ts">
  import { IconMenu2 } from '@tabler/icons-svelte'

  import { page } from '$app/stores'
  import { setIsMenuOpen, store } from '$stores'
  import Button from './Button.svelte'
  import TopPanelProfile from './TopPanelProfile.svelte'

  $: user = $page.data.user
</script>

<header class="top-panel" inert={$store.isMenuOpen}>
  <Button element="button" variant="icon" on:click={() => setIsMenuOpen(true)}>
    <span class="sr-only">{$store.isMenuOpen ? 'Close menu' : 'Open menu'}</span>
    <IconMenu2 size={32} />
  </Button>
  <TopPanelProfile {user} />
</header>

<style lang="scss">
  .top-panel {
    grid-column: 1/-1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem 0 0;
  }

  :global(.no-js) {
    .top-panel {
      justify-content: center;
      padding: 0;

      & > :global(.button) {
        display: none;
      }
    }
  }

  @media (min-width: 50rem) {
    .top-panel {
      grid-column: 2/3;
      justify-content: end;
      padding: 0 1rem;

      & > :global(.button) {
        display: none;
      }
    }

    :global(.no-js) {
      .top-panel {
        justify-content: end;
        padding: 0 1rem;
      }
    }
  }
</style>
