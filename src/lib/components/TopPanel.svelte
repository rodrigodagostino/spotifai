<script lang="ts">
  import { IconChevronLeft, IconChevronRight, IconMenu2 } from '@tabler/icons-svelte';

  import { afterNavigate, preloadData } from '$app/navigation';
  import { page } from '$app/stores';
  import { setIsMenuOpen, navigation } from '$stores/navigation';
  import SearchForm from './SearchForm.svelte';
  import Button from './Button.svelte';
  import TopPanelProfile from './TopPanelProfile.svelte';

  $: user = $page.data.user;

  let backStack: string[] = [];
  let forwardStack: string[] = [];
  let navClicked = false;

  afterNavigate(({ from }) => {
    if (!from) return;
    if (navClicked) {
      navClicked = false;
      return;
    }
    backStack = [...backStack, from.url.pathname];
    forwardStack = [];
  });
</script>

<header class="top-panel" inert={$navigation.isMenuOpen}>
  <Button
    element="button"
    variant="ghost"
    class="button--menu"
    on:click={() => setIsMenuOpen(true)}
  >
    <span class="sr-only">{$navigation.isMenuOpen ? 'Close menu' : 'Open menu'}</span>
    <IconMenu2 size={32} />
  </Button>
  <div class="top-panel__navigation-buttons">
    <Button
      element="button"
      variant="dark-solid"
      size="tiny"
      padding="medium"
      disabled={backStack.length === 0}
      on:mouseover={() => {
        if (backStack.length === 0) return;
        const prevPage = backStack[backStack.length - 1];
        preloadData(prevPage);
      }}
      on:click={async () => {
        if (backStack.length === 0) return;
        navClicked = true;
        const currPage = $page.url.pathname;
        history.back();
        forwardStack = [...forwardStack, currPage];
        backStack = backStack.slice(0, -1);
      }}
    >
      <span class="sr-only">Go back</span>
      <IconChevronLeft size={24} />
    </Button>
    <Button
      element="button"
      variant="dark-solid"
      size="tiny"
      padding="medium"
      disabled={forwardStack.length === 0}
      on:mouseover={() => {
        if (forwardStack.length === 0) return;
        const forwardPage = forwardStack[forwardStack.length - 1];
        preloadData(forwardPage);
      }}
      on:click={async () => {
        if (forwardStack.length === 0) return;
        navClicked = true;
        const currPage = $page.url.pathname;
        history.forward();
        backStack = [...backStack, currPage];
        forwardStack = forwardStack.slice(0, -1);
      }}
    >
      <span class="sr-only">Go forward</span>
      <IconChevronRight size={24} />
    </Button>
  </div>
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

    &__navigation-buttons {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    :global(.search-form) {
      display: none;
    }
  }

  :global(.no-js) {
    .top-panel {
      justify-content: center;

      :global(.button--menu),
      &__navigation-buttons {
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

      :global(.button--menu) {
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
