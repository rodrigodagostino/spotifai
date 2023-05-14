<script lang="ts">
  import type { LayoutData } from './$types'
  import ButtonLogout from '$components/ButtonLogout.svelte'
  import './styles.css'

  export let data: LayoutData

  $: user = data.user
</script>

{#if user}
  <p>Hello, {data.user?.display_name}</p>
  <ButtonLogout />
{/if}

<slot />
