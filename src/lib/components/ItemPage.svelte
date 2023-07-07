<script lang="ts">
  import { IconMusic } from '@tabler/icons-svelte'

  export let color: string | null
  export let image: string | undefined
  export let title: string
  export let type: string | undefined
</script>

<div class="item-page">
  <header class="item-page__header" style="background-color: {color}">
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
    <div class="item-page__header__background-gradient" />
  </header>
  <div class="item-page__content">
    <slot />
    <div class="item-page__content__background-color" style="background-color: {color}" />
    <div class="item-page__content__background-gradient" />
  </div>
</div>

<style lang="scss">
  .item-page {
    margin: calc(var(--top-panel-height) * -1) -1.5rem -1.5rem;

    &__header {
      display: flex;
      align-items: end;
      gap: 1.5rem;
      padding: var(--top-panel-height) 1.5rem 1.5rem;
      border-radius: 0.5rem 0.5rem 0 0;
      position: relative;

      & > * {
        position: relative;
        z-index: 10;
      }

      &__background-gradient {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%),
          var(--background-noise);
        z-index: 0;
      }
    }

    &__image {
      width: 14.5rem;
      height: 14.5rem;
      box-shadow: 0 0.25rem 3.75rem rgba(0, 0, 0, 0.5);
    }

    &__info {
    }

    &__type {
      font-size: 0.875rem;
    }

    &__title {
      font-size: 3.5rem;
      line-height: 1.24;
    }

    :global(.album__meta) {
      margin-top: 1rem;
    }

    &__content {
      padding: 1.5rem;
      position: relative;

      & > :global(*) {
        position: relative;
        z-index: 10;
      }

      &__background-color,
      &__background-gradient {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 14.5rem;
        z-index: 0;
      }

      &__background-gradient {
        background-image: linear-gradient(rgba(0, 0, 0, 0.6) 0, var(--gray-950) 100%),
          var(--background-noise);
      }
    }
  }

  @media (min-width: 50em) {
    .item-page {
      &__title {
        font-size: 6rem;
      }
    }
  }
</style>
