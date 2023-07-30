<script lang="ts">
  import { flip } from 'svelte/animate';

  import { toasts } from '$stores/toasts';
  import Toast from './Toast.svelte';
</script>

<div class="toasts">
  {#each $toasts as toast (toast.id)}
    <div class="toast__wrapper" animate:flip={{ duration: 320 }}>
      <Toast {...toast} />
    </div>
  {/each}
</div>

<style lang="scss">
  .toasts {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    padding: 1.25rem;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
  }
</style>
