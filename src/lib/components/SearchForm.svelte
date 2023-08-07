<script lang="ts">
  import { IconSearch, IconX } from '@tabler/icons-svelte';

  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import Button from './Button.svelte';

  let inputRef: HTMLInputElement;

  $: query = $page.params.query || '';

  afterNavigate(() => inputRef.focus());
</script>

<form action="/search" method="GET" role="search" class="search-form">
  <Button element="button" variant="ghost" padding="medium">
    <IconSearch size={24} />
  </Button>
  <input
    bind:this={inputRef}
    type="text"
    name="q"
    value={query}
    placeholder="What do you want to listen to?"
    class="search-form__input"
    required
  />
  {#if query.trim() !== ''}
    <Button element="a" href="/search" variant="ghost" padding="medium">
      <IconX size={18} />
    </Button>
  {/if}
</form>

<style lang="scss">
  .search-form {
    max-width: 100%;
    position: relative;

    &__input {
      max-width: 100%;
      height: 3rem;
      padding: 0 3rem;
      border: none;
      border-radius: 1.5rem;
      background-color: var(--gray-850);
      font-size: 0.875rem;

      &:hover {
        background-color: var(--gray-800);
        box-shadow: inset 0 0 0 2px var(--gray-650);
      }

      &:focus {
        box-shadow: inset 0 0 0 2px var(--white);
        outline: none;
      }
    }

    :global(.button) {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      &:first-child {
        left: 0.25rem;
      }

      &:last-child {
        right: 0.25rem;
      }
    }
  }
</style>
