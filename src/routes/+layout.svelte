<script lang="ts">
  import type { LayoutData } from './$types'
  import { page } from '$app/stores'
  import { store } from '$stores'
  import SidePanel from '$components/SidePanel.svelte'
  import TopPanel from '$components/TopPanel.svelte'
  import './styles.css'

  export let data: LayoutData

  $: user = data.user
</script>

<svelte:head>
  <title>{$page.data.title ? `Spotifai – ${$page.data.title}` : 'Spotifai'}</title>
</svelte:head>

<div class="page__inner">
  {#if user}
    <TopPanel />
    <SidePanel />
  {/if}
  <main class="page-main" id="main" inert={$store.isMenuOpen}>
    <slot />
  </main>
</div>

<style lang="scss">
  .page__inner {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-gap: 0.5rem;
    padding: 0.5rem;
  }

  .page-main {
    grid-column: 1/-1;
  }

  @media (min-width: 50rem) {
    .page__inner {
      grid-template-columns: 0.5fr 1fr;
    }

    .page-main {
      grid-column: 2/3;
    }
  }

  @media (min-width: 62.5rem) {
    .page__inner {
      grid-template-columns: 20rem 1fr;
    }
  }
</style>
