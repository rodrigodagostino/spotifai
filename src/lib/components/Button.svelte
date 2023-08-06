<script lang="ts" context="module">
  export type IButtonVariant =
    | 'primary-solid'
    | 'primary-outline'
    | 'secondary-solid'
    | 'secondary-outline'
    | 'tertiary-solid'
    | 'tertiary-outline'
    | 'dark-solid'
    | 'dark-outline'
    | 'ghost';
</script>

<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  type Element = $$Generic<'a' | 'button'>;

  interface ButtonElements {
    a: HTMLAnchorAttributes;
    button: HTMLButtonAttributes;
  }

  type $$Props = ButtonElements[Element] & {
    element: Element;
    variant?: IButtonVariant;
    size?: 'tiny' | 'small' | 'medium' | 'large';
    padding?: 'none' | 'narrow' | 'medium' | 'wide';
  };

  export let element: Element;
  export let variant: IButtonVariant = 'secondary-solid';
  export let size: 'tiny' | 'small' | 'medium' | 'large' = 'small';
  export let padding: 'none' | 'narrow' | 'medium' | 'wide' | undefined = undefined;

  let buttonRef: HTMLAnchorElement | HTMLButtonElement;

  let classes = [
    'button',
    variant ? `button--${variant}` : '',
    size ? `button--size-${size}` : '',
    padding ? `button--padding-${padding}` : '',
  ].join(' ');

  export const focus = () => buttonRef.focus();
</script>

<svelte:element
  this={element}
  bind:this={buttonRef}
  {...$$restProps}
  class="{classes} {$$restProps.class ? $$restProps.class : ''}"
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
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    transition:
      background-color 0.24s,
      color 0.24s,
      outline 0.24s;

    &:focus-visible {
      outline: 3px solid var(--white-rich);
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :global(img) {
      max-height: 1.75rem;
      border-radius: 1rem;
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

    &--dark-solid {
      color: var(--white);
      background-color: hsla(0, 0%, 0%, 0.5);

      &:focus,
      &:hover {
        color: var(--white-rich);
      }

      &:active {
        background-color: hsla(0, 0%, 0%, 0.75);
      }
    }

    &--dark-outline {
      color: var(--white);
      background-color: transparent;
      box-shadow: inset 0 0 0 0.125rem hsla(0, 0%, 0%, 0.5);

      &:focus,
      &:hover {
        color: var(--white-rich);
      }

      &:active {
        box-shadow: inset 0 0 0 0.125rem hsla(0, 0%, 0%, 0.75);
      }
    }

    &--ghost {
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

    &--size-tiny {
      font-size: 0.5rem;
    }

    &--size-small {
      font-size: 1rem;
    }

    &--size-medium {
      font-size: 1.25rem;
    }

    &--size-large {
      font-size: 2rem;
    }

    &--padding-none {
      padding: 0;
    }

    &--padding-narrow {
      padding: 0.25em;
    }

    &--padding-medium {
      padding: 0.5em;
    }

    &--padding-wide {
      padding: 1em;
    }
  }
</style>
