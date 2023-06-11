<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte'

  import { fade } from 'svelte/transition'
  import type { PageData } from '../../routes/$types'
  import Button from './Button.svelte'
  import ButtonLogout from './ButtonLogout.svelte'

  export let user: PageData['user']

  let isMenuExpanded = false
</script>

<div class="top-panel-profile">
  <Button element="button" variant="icon" on:click={() => (isMenuExpanded = !isMenuExpanded)}>
    {#if user?.images && user.images.length > 0}
      <img src={user.images[0].url} alt="" />
    {/if}
    {user?.display_name}
    <span class="sr-only">{isMenuExpanded ? 'Close profile menu' : 'Open profile menu'}</span>
  </Button>
  {#if isMenuExpanded}
    <nav class="top-panel-profile__menu" aria-label="Profile" transition:fade={{ duration: 160 }}>
      <ul>
        <li>
          <a href={user?.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            View on Spotify
            <IconExternalLink size={14} />
          </a>
        </li>
        <li><a href="/profile">View profile</a></li>
        <li><ButtonLogout /></li>
      </ul>
    </nav>
    <div
      class="top-panel-profile__overlay"
      aria-hidden={isMenuExpanded}
      on:click={() => (isMenuExpanded = !isMenuExpanded)}
    />
  {/if}
</div>

<style lang="scss">
  .top-panel-profile {
    position: relative;

    :global(.button) {
      z-index: 10;
    }

    &__menu {
      position: absolute;
      top: 100%;
      right: 0;
      padding: 0.25rem;
      border-radius: 0.25rem;
      background-color: var(--gray-950);
      z-index: 10;

      ul {
        list-style: none;
        padding-left: 0;
      }

      li {
        &:last-child {
          border-top: 1px solid var(--gray-800);
        }
      }

      a,
      :global(button) {
        display: block;
        padding: 0.5rem 0.75rem;
        border-radius: 0.125rem;
        font-size: 0.875rem;
        text-decoration: none;

        &:focus,
        &:hover {
          background-color: var(--gray-800);
        }
      }
    }

    &__overlay {
      position: fixed;
      inset: 0;
    }
  }
</style>
