<script lang="ts">
  import { IconMenu2 } from '@tabler/icons-svelte'

  import { setIsMenuOpen, store } from '$stores'
  import Button from './Button.svelte'
</script>

<header class="top-panel" inert={$store.isMenuOpen}>
  <Button element="button" variant="icon" on:click={() => setIsMenuOpen(true)}>
    <span class="sr-only">Open menu</span>
    <IconMenu2 size={32} />
  </Button>
  Top Panel
</header>

<style lang="scss">
  .top-panel {
    grid-column: 1/-1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  @media (min-width: 50rem) {
    .top-panel {
      grid-column: 2/3;

      :global(.button) {
        display: none;
      }
    }
  }
</style>
