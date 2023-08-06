<script lang="ts">
  import NProgress from 'nprogress';
  import 'nprogress/nprogress.css';
  import MicroModal from 'micromodal';

  import type { LayoutData } from './$types';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { navigation } from '$stores/navigation';
  import TopPanel from '$components/TopPanel.svelte';
  import SidePanel from '$components/SidePanel.svelte';
  import SidePanelBottom from '$components/SidePanelBottom.svelte';
  import BottomPanel from '$components/BottomPanel.svelte';
  import SearchForm from '$components/SearchForm.svelte';
  import Toasts from '$components/Toasts.svelte';
  import Button from '$components/Button.svelte';
  import './styles.css';
  import Toast from '$components/Toast.svelte';

  export let data: LayoutData;

  $: hasSuccess = $page.url.searchParams.get('success');
  $: hasError = $page.url.searchParams.get('error');

  $: user = data.user;
  $: userPlaylists = data.userPlaylists;

  NProgress.configure({ showSpinner: false });

  if (browser) MicroModal.init();

  beforeNavigate(() => {
    NProgress.start();
  });

  afterNavigate(() => {
    NProgress.done();
    document.querySelector('#main .page-main__inner')?.scrollTo(0, 0);
  });
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
    <SidePanelBottom playlists={userPlaylists} />
  {/if}
  <main class="page-main" id="main" inert={$navigation.isMenuOpen}>
    <div class="page-main__inner">
      {#if $page.url.pathname.startsWith('/search')}
        <SearchForm />
      {/if}
      <slot />
    </div>
  </main>
  {#if user}
    <BottomPanel />
  {/if}
  {#if hasSuccess || hasError}
    <Toast
      id="1234"
      type={hasSuccess ? 'success' : 'error'}
      message={hasSuccess || hasError || 'Dummy message'}
      onCloseDestination={$page.url.pathname}
    />
  {/if}
</div>

<Toasts />

<style lang="scss">
  :global(.button.button--skip-to-content) {
    position: absolute;
    top: -100%;
    left: 0.75rem;
    z-index: 200;

    &:focus {
      top: 0.75rem;
    }
  }

  .page__inner {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-gap: 0.5rem;
    padding: 0.5rem;

    & > :global(.toast) {
      position: fixed;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
    }
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

      &::-webkit-scrollbar {
        width: 0.5rem;
      }

      &::-webkit-scrollbar-thumb {
        background: var(--gray-500);
      }

      &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.16);
      }
    }

    :global(.search-form) {
      margin-bottom: 2rem;
    }
  }

  @media (min-width: 50rem) {
    .page__inner {
      grid-template-columns: 1fr 2fr;
    }

    .page-main {
      grid-column: 2/3;
      grid-row: 1/3;

      :global(.search-form) {
        display: none;
      }
    }
  }

  @media (min-width: 62.5rem) {
    .page__inner {
      grid-template-columns: 20rem 1fr;
    }
  }
</style>
