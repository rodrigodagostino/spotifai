<script lang="ts">
  import Button from '$components/Button.svelte';

  export let data;
  export let form;
</script>

<div class="add-playlist-page">
  <header class="add-playlist-page__header">
    <h1>Add a new playlist</h1>
  </header>
  <div class="add-playlist-page__content">
    <form class="form" method="POST">
      <input hidden name="userId" value={data.user?.id} />
      <div class="form-field" class:form-field--has-error={form?.nameError}>
        <label for="playlist-name">Name</label>
        <input type="text" id="playlist-name" name="name" value={form?.name || ''} />
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
          value={form?.description || ''}
        />
      </div>
      {#if form?.apiError}
        <p class="form__error">{form?.apiError}</p>
      {/if}
      <Button element="button" type="submit">Create playlist</Button>
    </form>
  </div>
</div>

<style lang="scss">
  .add-playlist-page {
    &__content {
      margin-top: 2rem;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1.25rem;
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
  }
</style>
