<script lang="ts">
  import { IconMenu2 } from '@tabler/icons-svelte';

  import { page } from '$app/stores';
  import { setIsMenuOpen, navigation } from '$stores/navigation';
  import SearchForm from './SearchForm.svelte';
  import Button from './Button.svelte';
  import TopPanelProfile from './TopPanelProfile.svelte';

  $: user = $page.data.user;
</script>

<header class="top-panel" inert={$navigation.isMenuOpen}>
  <Button element="button" variant="ghost" on:click={() => setIsMenuOpen(true)}>
    <span class="sr-only">{$navigation.isMenuOpen ? 'Close menu' : 'Open menu'}</span>
    <IconMenu2 size={32} />
  </Button>
  {#if $page.url.pathname.startsWith('/search')}
    <SearchForm />
  {/if}
  <TopPanelProfile {user} />
</header>

<style lang="scss">
  .top-panel {
    grid-column: 1/-1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    z-index: 20;

    :global(.search-form) {
      display: none;
    }
  }

  :global(.no-js) {
    .top-panel {
      justify-content: center;

      & > :global(.button) {
        display: none;
      }
    }
  }

  @media (min-width: 50rem) {
    .top-panel {
      height: var(--top-panel-height);
      grid-column: 2/3;
      grid-row: 1/2;
      justify-content: end;
      padding: 0 1.5rem;
      border-radius: 0.5rem 0.5rem 0 0;

      & > :global(.button) {
        display: none;
      }

      :global(.search-form) {
        display: block;
        max-width: 50%;
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
