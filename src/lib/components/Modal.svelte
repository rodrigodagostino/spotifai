<script lang="ts">
  import { IconX } from '@tabler/icons-svelte';

  import Button from './Button.svelte';

  export let id: string;
  export let title: string;
</script>

<div {id} class="modal" aria-hidden="true">
  <div class="modal__overlay" tabindex="-1" data-micromodal-close>
    <div class="modal__inner" role="dialog" aria-modal="true" aria-labelledby="{id}-title">
      <header>
        <h2 id="{id}-title" class="modal__title">{title}</h2>
        <Button
          element="button"
          variant="icon-ghost"
          aria-label="Close modal"
          data-micromodal-close
        >
          <span class="sr-only">Close modal</span>
          <IconX size={24} />
        </Button>
      </header>
      <div id="{id}-content" class="modal__content">
        <slot />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .modal {
    position: fixed;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    z-index: 1001;

    &__overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 1.25rem;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &__inner {
      width: 100%;
      max-width: 25rem;
      max-height: 80vh;
      padding: 1.5rem;
      border-radius: 0.5rem;
      background-color: var(--gray-950);
      position: relative;

      header {
        :global(.button) {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
        }
      }
    }

    &__title {
      margin-right: 2rem;
    }

    &__content {
      margin-top: 2rem;
    }

    &:is([aria-hidden='false']) {
      opacity: 1;
      visibility: visible;
    }
  }
</style>
