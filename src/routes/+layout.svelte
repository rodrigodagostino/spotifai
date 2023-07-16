<script lang="ts">
  import NProgress from 'nprogress'
  import 'nprogress/nprogress.css'

  import type { LayoutData } from './$types'
  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import { store } from '$stores'
  import SidePanel from '$components/SidePanel.svelte'
  import TopPanel from '$components/TopPanel.svelte'
  import BottomPanel from '$components/BottomPanel.svelte'
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
    <div class="page-main__inner">
      <slot />
    </div>
  </main>
  {#if user}
    <BottomPanel />
  {/if}
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
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-gap: 0.5rem;
    padding: 0.5rem;
  }

  .page-main {
    grid-column: 1/-1;
    border-radius: 0.5rem;
    background-color: var(--gray-950);
    position: relative;
    overflow: hidden;

    &__inner {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: var(--top-panel-height) 1.5rem 1.5rem;
      overflow-x: hidden;
      overflow-y: scroll;
      scrollbar-width: thin;
    }
  }

  @media (min-width: 50rem) {
    .page__inner {
      grid-template-columns: 0.5fr 1fr;
    }

    .page-main {
      grid-column: 2/3;
      grid-row: 1/3;
    }
  }

  @media (min-width: 62.5rem) {
    .page__inner {
      grid-template-columns: 20rem 1fr;
    }
  }
</style>
