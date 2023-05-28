<script>
  import { onMount } from 'svelte'
  import { setIsMenuOpen, store } from '$stores'

  onMount(() => {
    const resizeObserver = new ResizeObserver(() => $store.isMenuOpen && setIsMenuOpen(false))
    resizeObserver.observe(document.body)

    return () => resizeObserver.unobserve(document.body)
  })
</script>

<svelte:head>
  <title>Spotifai</title>
  {#if $store.isMenuOpen}
    <style>
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

<div class="home">
  <div class="home__inner">
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation.</p>
  </div>
</div>
