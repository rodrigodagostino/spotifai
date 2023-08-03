<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { page } from '$app/stores';
  import Button from '$components/Button.svelte';
  import ButtonLogout from '$components/ButtonLogout.svelte';
  import { IconExclamationCircle } from '@tabler/icons-svelte';

  let isRetrying = false;
  const retryRoutes = ['/album/[id]', '/playlist/[id]', '/artist/[id]', '/search/[query]'];
</script>

<svelte:head>
  <title>{$page.status}</title>
</svelte:head>

<div class="not-found">
  <div class="not-found__inner">
    <IconExclamationCircle size={52} />
    <h1>{$page.error?.message}</h1>

    {#if $page.status === 404}
      <p>The page you are looking for does not exist.</p>
      <div class="not-found__buttons">
        <Button element="a" href="/">Home</Button>
        <Button element="a" href="/search" variant="text">Search</Button>
      </div>
    {:else if $page.status === 401}
      <p>Your current session has expired. Please, log out and log in again.</p>
      <div class="not-found__buttons">
        <ButtonLogout />
      </div>
    {:else if ![401, 404].includes($page.status) && $page.route.id && retryRoutes.includes($page.route.id)}
      <div class="not-found__buttons">
        <Button
          element="button"
          disabled={isRetrying}
          on:click={async () => {
            isRetrying = true;
            await invalidate(`app:${$page.route.id}`);
            isRetrying = false;
          }}
        >
          Retry
        </Button>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .not-found {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    text-align: center;

    &__buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-top: 2rem;
    }
  }
</style>
