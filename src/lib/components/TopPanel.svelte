<script lang="ts">
  import { setIsMenuOpen, store } from '$stores'
  import { IconMenu2 } from '@tabler/icons-svelte'
</script>

<header class="top-panel" inert={$store.isMenuOpen}>
  <button class="top-panel__menu-button" on:click={() => setIsMenuOpen(true)}>
    <IconMenu2 size={32} />
  </button>
  Top Panel
</header>

<style lang="scss">
  .top-panel {
    grid-column: 1/-1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    &__menu-button {
      display: flex;
      padding: 0.5rem;
      border: none;
      cursor: pointer;
    }
  }

  @media (min-width: 50rem) {
    .top-panel {
      grid-column: 2/3;

      &__menu-button {
        display: none;
      }
    }
  }
</style>
