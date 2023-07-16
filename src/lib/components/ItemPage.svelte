<script lang="ts">
  import { IconMusic } from '@tabler/icons-svelte'
  import { camelCase, startCase } from 'lodash'

  export let image: string | undefined
  export let color: string | null
  export let type: string | undefined
  export let title: string
</script>

<div class="item-page" style="background-color: {color}">
  <header class="item-page__header">
    {#if image}
      <img class="item-page__image" src={image} alt={title} loading="lazy" />
    {:else}
      <div class="item-page__image-placeholder"><IconMusic size={80} /></div>
    {/if}
    <div class="item-page__info">
      {#if type}<p class="item-page__type">{startCase(camelCase(type))}</p>{/if}
      <h1 class="item-page__title">{title}</h1>
      <slot name="description" />
      <slot name="meta" />
    </div>
    <div class="item-page__header__background-gradient" />
  </header>
  <div class="item-page__content">
    <slot />
    <div class="item-page__content__background-gradient" />
  </div>
</div>

<style lang="scss">
  .item-page {
    height: calc(100% + var(--top-panel-height) + 1.5rem);
    margin: calc(var(--top-panel-height) * -1) -1.5rem;
    display: flex;
    flex-direction: column;

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem 1.5rem 1.5rem;
      border-radius: 0.5rem 0.5rem 0 0;
      position: relative;
      text-align: center;

      & > * {
        position: relative;
        z-index: 10;
      }

      &__background-gradient {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(
            transparent var(--top-panel-height),
            rgba(0, 0, 0, 0.5) 100%
          ),
          var(--background-noise);
        z-index: 0;
      }
    }

    &__image,
    &__image-placeholder {
      flex-shrink: 0;
      width: 14.5rem;
      height: 14.5rem;
      box-shadow: 0 0.25rem 3.75rem rgba(0, 0, 0, 0.5);
    }

    &__image-placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__type {
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    &__title {
      font-size: 3.5rem;
      line-height: 1;
    }

    &__content {
      flex: 1;
      padding: 1.5rem;
      position: relative;

      & > :global(*) {
        position: relative;
        z-index: 10;
      }

      &__background-gradient {
        position: absolute;
        inset: 0;
        background-image: linear-gradient(rgba(0, 0, 0, 0.6) 0, var(--gray-950) 16rem),
          var(--background-noise);
        z-index: 0;
      }
    }
  }

  @media (min-width: 50em) {
    .item-page {
      &__header {
        flex-direction: initial;
        align-items: end;
        padding-top: var(--top-panel-height);
        text-align: initial;
      }

      &__title {
        font-size: 6rem;
      }
    }
  }
</style>
