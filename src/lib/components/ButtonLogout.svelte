<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import Button, { type IButtonVariant } from './Button.svelte';

  export let variant: IButtonVariant = 'secondary-solid';
</script>

<form
  method="POST"
  action="/api/auth/logout"
  on:submit|preventDefault={async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
    });

    if (response.ok) invalidateAll();
  }}
>
  <Button element="button" type="submit" {variant}>Logout</Button>
</form>
