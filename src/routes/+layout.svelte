<script lang="ts">
  import NProgress from 'nprogress'
  import 'nprogress/nprogress.css'

  import type { LayoutData } from './$types'
  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import { store } from '$stores'
  import SidePanel from '$components/SidePanel.svelte'
  import TopPanel from '$components/TopPanel.svelte'
  import Button from '$components/Button.svelte'
  import './styles.css'

  export let data: LayoutData

  $: user = data.user

  NProgress.configure({ showSpinner: false })

  beforeNavigate(() => {
    NProgress.start()
  })

  afterNavigate(() => {
    NProgress.done()
  })
</script>

<svelte:head>
  <title>{$page.data.title ? `Spotifai – ${$page.data.title}` : 'Spotifai'}</title>
</svelte:head>

{#if user}
  <Button element="a" href="#main" class="button--skip-to-content" variant="primary-solid">
    Skip to content
  </Button>
{/if}

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
  :global(.button--skip-to-content) {
    position: absolute;
    top: -100%;
    left: 0.75rem;
    z-index: 200;

    &:focus {
      top: 0.75rem;
    }
  }

  .page__inner {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-gap: 0.5rem;
    padding: 0.5rem;
  }

  .page-main {
    grid-column: 1/-1;
    padding: 1rem;
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
