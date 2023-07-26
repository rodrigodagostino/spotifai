<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { applyAction, enhance } from '$app/forms';
  import type { ActionData as AddActionData } from '../../routes/playlists/add/$types';
  import type { ActionData as EditActionData } from '../../routes/playlist/[id]/edit/$types';
  import Button from './Button.svelte';

  export let form: AddActionData | EditActionData;
  export let userId: string | undefined = undefined;
  export let action: string | undefined = undefined;
  export let playlist:
    | SpotifyApi.PlaylistObjectFull
    | SpotifyApi.PlaylistObjectSimplified
    | undefined = undefined;

  const dispatch = createEventDispatcher<{
    success: {};
    redirect: {};
  }>();

  let isFetching = false;
</script>

<form
  class="playlist-form"
  method="POST"
  {action}
  use:enhance={() => {
    isFetching = true;
    return ({ result }) => {
      applyAction(result);
      isFetching = false;
      if (result.type === 'success') dispatch('success');
      if (result.type === 'redirect') dispatch('redirect');
    };
  }}
>
  {#if userId}<input hidden name="userId" value={userId} />{/if}
  <div class="form-field" class:form-field--has-error={form?.nameError}>
    <label for="playlist-name">Name</label>
    <input type="text" id="playlist-name" name="name" value={form?.name || playlist?.name || ''} />
    {#if form?.nameError}
      <p class="form-field__error">{form?.nameError}</p>
    {/if}
  </div>
  <div class="form-field">
    <label for="playlist-description">Description</label>
    <input
      type="text"
      id="playlist-description"
      name="description"
      value={form?.description || playlist?.description || ''}
    />
  </div>
  {#if form?.apiError}
    <p class="playlist-form__error">{form?.apiError}</p>
  {/if}
  <Button element="button" type="submit" disabled={isFetching}>
    {playlist ? 'Save playlist' : 'Create playlist'}
  </Button>
</form>

<style lang="scss">
  .playlist-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
    max-width: 22.5rem;

    :global(.button) {
      align-self: center;
      margin-top: 1rem;
    }

    &__error {
      color: var(--red-500);
    }
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    input {
      padding: 0.5rem;
      border: none;
      border-radius: 0.25rem;
      background-color: var(--gray-750);
    }

    &__error {
      font-size: 0.875rem;
      color: var(--red-500);
    }

    &--has-error {
      input {
        box-shadow: inset 0 0 0 0.125rem var(--red-500);
      }
    }
  }
</style>
