<script lang="ts">
  import type { LayoutData } from './$types'
  import Sidebar from '$components/SidePanel.svelte'
  import './styles.css'

  export let data: LayoutData

  $: user = data.user
</script>

<div class="page__inner">
  {#if user}
    <Sidebar />
  {/if}
  <main class="page-main" id="main">
    <slot />
  </main>
</div>

<style lang="scss">
  .page__inner {
    display: grid;
    grid-template-columns: 20rem 1fr;
    grid-gap: 0.5rem;
    padding: 0.5rem;
  }
</style>
