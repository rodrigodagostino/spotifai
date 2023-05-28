<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

  type Element = $$Generic<'a' | 'button'>

  interface ButtonElements {
    a: HTMLAnchorAttributes
    button: HTMLButtonAttributes
  }

  type $$Props = ButtonElements[Element] & {
    element: Element
    variant?:
      | 'primary-solid'
      | 'primary-outline'
      | 'secondary-solid'
      | 'secondary-outline'
      | 'tertiary-solid'
      | 'tertiary-outline'
      | 'text'
      | 'icon'
    size?: 'small' | 'medium' | 'large'
  }

  export let element: Element
  export let variant:
    | 'primary-solid'
    | 'primary-outline'
    | 'secondary-solid'
    | 'secondary-outline'
    | 'tertiary-solid'
    | 'tertiary-outline'
    | 'text'
    | 'icon' = 'secondary-solid'
  export let size: 'small' | 'medium' | 'large' = 'small'
</script>

<svelte:element
  this={element}
  {...$$restProps}
  class="button button--{variant} button--{size} {$$restProps.class ? $$restProps.class : ''}"
  on:click
>
  {#if $$slots.default}
    <slot />
  {/if}
</svelte:element>

<style lang="scss">
  .button {
    display: inline-flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    padding-block: 0.625em;
    padding-inline: 1.5em;
    border: none;
    border-radius: 2em;
    outline: 3px solid transparent;
    font-family: var(--font-main);
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.24s, color 0.24s, outline 0.24s;
    cursor: pointer;

    &:focus-visible {
      outline: 3px solid currentColor;
    }

    &--primary-solid {
      color: var(--black);
      background-color: var(--spotify-background);

      &:focus,
      &:hover {
        background-color: var(--spotify-background-highlight);
      }

      &:active {
        background-color: var(--spotify-background-press);
      }
    }

    &--primary-outline {
      color: var(--spotify-text);
      background-color: transparent;
      box-shadow: inset 0 0 0 0.125rem var(--spotify-text);

      &:focus,
      &:hover {
        color: var(--spotify-text-highlight);
        box-shadow: inset 0 0 0 0.125rem var(--spotify-text-highlight);
      }

      &:active {
        color: var(--spotify-text-press);
        box-shadow: inset 0 0 0 0.125rem var(--spotify-text-press);
      }
    }

    &--secondary-solid {
      color: var(--black);
      background-color: var(--white);

      &:focus,
      &:hover {
        background-color: var(--white-rich);
      }

      &:active {
        background-color: var(--gray-200);
      }
    }

    &--secondary-outline {
      color: var(--white);
      background-color: transparent;
      box-shadow: inset 0 0 0 0.125rem var(--white);

      &:focus,
      &:hover {
        color: var(--white-rich);
        box-shadow: inset 0 0 0 0.125rem var(--white-rich);
      }

      &:active {
        color: var(--gray-200);
        box-shadow: inset 0 0 0 0.125rem var(--gray-200);
      }
    }

    &--tertiary-solid {
      color: var(--white);
      background-color: hsla(0, 0%, 100%, 0.08);

      &:focus,
      &:hover {
        color: var(--white-rich);
        background-color: hsla(0, 0%, 100%, 0.1);
      }

      &:active {
        color: var(--gray-200);
        background-color: hsla(0, 0%, 100%, 0.06);
      }
    }

    &--tertiary-outline {
      color: var(--white);
      background-color: transparent;
      box-shadow: inset 0 0 0 0.125rem hsla(0, 0%, 100%, 0.08);

      &:focus,
      &:hover {
        color: var(--white-rich);
        box-shadow: inset 0 0 0 0.125rem hsla(0, 0%, 100%, 0.1);
      }

      &:active {
        color: var(--gray-200);
        box-shadow: inset 0 0 0 0.125rem hsla(0, 0%, 100%, 0.06);
      }
    }

    &--text {
      color: var(--white);
      background-color: transparent;

      &:focus,
      &:hover {
        color: var(--white-rich);
      }

      &:active {
        background-color: hsla(0, 0%, 100%, 0.06);
      }
    }

    &--icon {
      padding: 0.5rem;
      color: var(--white);
      background-color: transparent;

      &:focus,
      &:hover {
        color: var(--white-rich);
      }

      &:active {
        background-color: hsla(0, 0%, 100%, 0.06);
      }
    }

    &--small {
      font-size: 1rem;
    }

    &--medium {
      font-size: 1.25rem;
    }

    &--large {
      font-size: 2rem;
    }
  }
</style>
