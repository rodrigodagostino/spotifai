<script lang="ts">
  import { IconMusic } from '@tabler/icons-svelte'

  export let color: string | null
  export let image: string | undefined
  export let title: string
  export let type: string | undefined
</script>

<div class="item-page">
  <header class="item-page__header">
    {#if image}
      <img class="item-page__image" src={image} alt={title} loading="lazy" />
    {:else}
      <div class="item-page__image-placeholder"><IconMusic size={80} /></div>
    {/if}
    <div class="item-page__info">
      {#if type}<p class="item-page__type">{type}</p>{/if}
      <h1 class="item-page__title">{title}</h1>
      <slot name="meta" />
    </div>
  </header>
  <div class="item-page__content"><slot /></div>
</div>
