<script lang="ts">
  import { IconExternalLink } from '@tabler/icons-svelte'

  import type { PageData } from '../../routes/$types'
  import Button from './Button.svelte'
  import ButtonLogout from './ButtonLogout.svelte'

  export let user: PageData['user']

  let isMenuExpanded = false
</script>

<div class="top-panel-profile">
  <Button element="button" variant="icon-ghost" on:click={() => (isMenuExpanded = !isMenuExpanded)}>
    {#if user?.images && user.images.length > 0}
      <img src={user.images[0].url} alt="" />
    {/if}
    {user?.display_name}
    <span class="sr-only">{isMenuExpanded ? 'Close profile menu' : 'Open profile menu'}</span>
  </Button>
  <nav class="top-panel-profile__menu" aria-label="Profile" aria-hidden={!isMenuExpanded}>
    <ul>
      <li>
        <a href={user?.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          View on Spotify
          <IconExternalLink size={14} />
        </a>
      </li>
      <li><a href="/profile">View profile</a></li>
      <li><ButtonLogout variant="text" /></li>
    </ul>
  </nav>
  {#if isMenuExpanded}
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
      width: 100%;
      position: relative;
      z-index: 10;
      text-align: start;
    }

    &__menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      padding: 0.25rem;
      border-radius: 0.25rem;
      background-color: var(--gray-850);
      opacity: 0;
      visibility: hidden;
      z-index: 10;
      transition: opacity 0.16s, visibility 0s 0.16s;

      &[aria-hidden='false'] {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.16s, visibility 0s;
      }

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
      :global(.button) {
        display: block;
        padding: 0.5rem 0.75rem;
        border-radius: 0.125rem;
        font-size: 0.875rem;
        text-decoration: none;
        white-space: nowrap;

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

  :global(.no-js) {
    .top-panel-profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      &__menu {
        position: initial;
        opacity: initial;
        visibility: initial;

        ul {
          display: flex;
        }

        li {
          &:last-child {
            border-top: none;
            border-left: 1px solid var(--gray-800);
          }
        }
      }
    }
  }

  @media (min-width: 50rem) {
    :global(.no-js) {
      .top-panel-profile {
        flex-direction: row;
      }
    }
  }
</style>
