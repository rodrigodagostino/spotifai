<script lang="ts">
  import { type Icon, IconHome, IconSearch, IconPlaylist } from '@tabler/icons-svelte'

  import type { ComponentType } from 'svelte'
  import SpotifyLogo from './SpotifyLogo.svelte'
  import { page } from '$app/stores'

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
  ]
</script>

<nav class="side-panel" aria-label="Main">
  <SpotifyLogo />
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

<style lang="scss">
  .side-panel {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: var(--gray-900);

    :global(.spotify-logo) {
      height: 2.25rem;
    }

    &__menu {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-top: 2rem;
      list-style: none;
    }

    &__menu-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
    }
  }
</style>
