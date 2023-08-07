<script lang="ts">
  import { fly } from 'svelte/transition';
  import { IconX } from '@tabler/icons-svelte';

  import { removeToast, type IToast } from '$stores/toasts';
  import Button from './Button.svelte';

  export let id: IToast['id'];
  export let type: IToast['type'];
  export let message: IToast['message'];
  export let onCloseDestination: string | undefined = undefined;
</script>

<div class="toast toast--{type}" transition:fly={{ x: 100, duration: 320 }}>
  <div class="toast__inner">
    <p class="toast__message" role="status">{message}</p>
    {#if !onCloseDestination}
      <Button
        element="button"
        variant="ghost"
        padding="medium"
        on:click|once={() => removeToast(id)}
      >
        <IconX size={20} />
      </Button>
    {:else}
      <Button element="a" href={onCloseDestination} variant="ghost" padding="medium">
        <IconX size={20} />
      </Button>
    {/if}
  </div>
</div>

<style lang="scss">
  .toast {
    margin-bottom: 0.75rem;
    z-index: 1001;

    &__inner {
      display: flex;
      gap: 1rem;
      align-items: center;
      padding: 0.75rem 1rem 0.75rem 1.5rem;
      border-radius: 0.25rem;
      background-color: var(--gray-850);
      box-shadow:
        0 0 1px rgba(0, 0, 0, 0.16),
        0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
      color: var(--gray-050);
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.25rem;
        background-color: var(--indigo-600);
        animation: progress 8s linear forwards;
      }
    }

    &__text {
      :global(strong) {
        color: var(--white-rich);
        font-weight: 600;
      }
    }

    :global(.button) {
      flex: 0 0 auto;
    }

    &--success {
      .toast__inner {
        background-color: var(--green-500);
      }
    }

    &--info {
      .toast__inner {
        background-color: var(--sky-500);
      }
    }

    &--warning {
      .toast__inner {
        background-color: var(--amber-500);
        color: var(--gray-950);
      }
    }

    &--error {
      .toast__inner {
        background-color: var(--red-500);
      }
    }
  }

  @keyframes progress {
    0% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
</style>
