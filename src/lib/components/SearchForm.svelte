<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { IconSearch } from '@tabler/icons-svelte';

  let inputRef: HTMLInputElement;

  $: query = $page.params.query || '';

  afterNavigate(() => inputRef.focus());
</script>

<form action="/search" method="GET" role="search" class="search-form">
  <input
    bind:this={inputRef}
    type="text"
    name="q"
    value={query}
    placeholder="What do you want to listen to?"
    class="search-form__input"
    required
  />
  <button type="submit" class="search-form__button">
    <IconSearch size={24} />
  </button>
</form>

<style lang="scss">
  .search-form {
    max-width: 100%;
    margin-right: auto;
    position: relative;

    &__input {
      max-width: 100%;
      height: 3rem;
      padding: 0 2rem 0 3rem;
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

    &__button {
      display: flex;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border: none;
      color: var(--white);
    }
  }
</style>
