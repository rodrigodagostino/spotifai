<script lang="ts">
  import { type Icon, IconHome, IconSearch, IconPlaylist, IconX } from '@tabler/icons-svelte';

  import type { ComponentType } from 'svelte';
  import { browser } from '$app/environment';
  import { beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { setIsMenuOpen, navigation } from '$stores/navigation';
  import SpotifyLogo from './SpotifyLogo.svelte';
  import Button from './Button.svelte';

  beforeNavigate(() => setIsMenuOpen(false));

  const menuItems: { path: string; label: string; icon: ComponentType<Icon> }[] = [
    {
      path: '/',
      label: 'Home',
      icon: IconHome,
    },
    {
      path: '/search',
      label: 'Search',
      icon: IconSearch,
    },
    {
      path: '/playlists',
      label: 'Playlists',
      icon: IconPlaylist,
    },
  ];
</script>

<nav
  class="side-panel"
  aria-label="Main"
  aria-hidden={!$navigation.isMenuOpen}
  inert={browser && document.body.clientWidth < 800 && !$navigation.isMenuOpen}
>
  <div class="side-panel__header">
    <SpotifyLogo />
    <Button element="button" variant="ghost" padding="medium" on:click={() => setIsMenuOpen(false)}>
      <span class="sr-only">Close menu</span>
      <IconX size={32} />
    </Button>
  </div>
  <ul class="side-panel__menu">
    {#each menuItems as item}
      <li class="side-panel__menu-item">
        <a
          class="side-panel__menu-link"
          href={item.path}
          aria-current={item.path === $page.url.pathname && 'page'}
        >
          <svelte:component this={item.icon} focusable="false" aria-hidden="true" />
          {item.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>
{#if $navigation.isMenuOpen}
  <div
    class="side-panel__overlay"
    aria-hidden={!$navigation.isMenuOpen}
    on:click={() => setIsMenuOpen(false)}
  />
{/if}

<style lang="scss">
  .side-panel {
    grid-row: 1/2;
    padding: 1rem 1rem 1.5rem;
    border-radius: 0 0.5rem 0.5rem 0;
    background-color: var(--gray-950);
    position: fixed;
    left: 0;
    width: 20rem;
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
    transition:
      transform 0.24s,
      opacity 0.24s;
    z-index: 100;

    &[aria-hidden='false'] {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    :global(.spotify-logo) {
      height: 2.25rem;
    }

    &__menu {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1.5rem;
      margin-top: 2rem;
      list-style: none;
    }

    &__menu-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 500;
      color: var(--gray-300);
      text-decoration: none;
      transition: color 0.24s;

      &[aria-current='page'],
      &:focus,
      &:hover {
        color: var(--white-rich);
      }

      :global(.tabler-icon) {
        width: 1.75rem;
        height: 1.75rem;
      }
    }

    &__overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.2);
      opacity: 0;
      visibility: hidden;
      z-index: 99;
      transition:
        opacity 0.24s,
        visibility 0s 0.24s;

      &[aria-hidden='false'] {
        opacity: 1;
        visibility: visible;
        transition:
          opacity 0.24s,
          visibility 0s;
      }
    }
  }

  @media (max-width: 32.4375em) {
    :global(.no-js) {
      .side-panel {
        &__menu-link {
          :global(.tabler-icon) {
            display: none;
          }
        }
      }
    }
  }

  @media (max-width: 49.9375em) {
    :global(.no-js) {
      .side-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        width: auto;
        position: initial;
        border-radius: 0.5rem;
        transform: initial;
        opacity: initial;

        :global(.button) {
          display: none;
        }

        &__menu {
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
          margin-top: 0;
        }
      }
    }
  }

  @media (min-width: 50em) {
    .side-panel {
      width: auto;
      position: initial;
      border-radius: 0.5rem;
      transform: initial;
      opacity: initial;

      :global(.button) {
        display: none;
      }
    }
  }
</style>
