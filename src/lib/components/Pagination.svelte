<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { IconArrowLeft, IconArrowRight } from '@tabler/icons-svelte';

  import { page } from '$app/stores';
  import Button from './Button.svelte';

  export let paginatedList: SpotifyApi.PagingObject<any> | SpotifyApi.CursorBasedPagingObject<any>;
  export let isLoadingMore: boolean;

  $: currentPageNumber = $page.url.searchParams.get('page') || 1;

  const dispatch = createEventDispatcher<{ loadMore: {} }>();
</script>

{#if paginatedList.next}
  <div class="load-more">
    {#if !isLoadingMore}
      <Button
        element="button"
        variant="secondary-outline"
        disabled={isLoadingMore}
        on:click={() => dispatch('loadMore')}
      >
        Load more
      </Button>
    {:else}
      <div class="load-more__loading-animation">
        <span class="load-more__loading-animation__dot-one" />
        <span class="load-more__loading-animation__dot-two" />
        <span class="load-more__loading-animation__dot-three" />
      </div>
    {/if}
  </div>
{/if}

{#if 'previous' in paginatedList}
  <div class="pagination">
    {#if paginatedList.previous}
      <Button
        element="a"
        href="{$page.url.pathname}?{new URLSearchParams({
          page: `${Number(currentPageNumber) - 1}`,
        }).toString()}"
        variant="secondary-outline"
      >
        <IconArrowLeft size={24} />
        Previous page
      </Button>
    {/if}
    {#if paginatedList.next}
      <Button
        element="a"
        href="{$page.url.pathname}?{new URLSearchParams({
          page: `${Number(currentPageNumber) + 1}`,
        }).toString()}"
        variant="secondary-outline"
      >
        Next page
        <IconArrowRight size={24} />
      </Button>
    {/if}
  </div>
{/if}

<style lang="scss">
  :global(.no-js) {
    .load-more {
      display: none;
    }

    .pagination {
      display: block;
    }
  }

  .load-more,
  .pagination {
    margin-top: 1.5rem;
    text-align: center;
  }

  .load-more {
    &__loading-animation {
      height: 2.8125rem;
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      align-items: center;

      &__dot-one,
      &__dot-two,
      &__dot-three {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 0.25rem;
        background-color: var(--white);
        animation: loading-animation 1s infinite linear;
      }

      &__dot-one {
        animation-delay: 0s;
      }

      &__dot-two {
        animation-delay: 0.1s;
      }

      &__dot-three {
        animation-delay: 0.2s;
      }
    }
  }

  .pagination {
    display: none;
  }

  @keyframes loading-animation {
    0% {
      transform: translate3d(0, -1rem, 0);
      opacity: 0;
    }
    25%,
    50%,
    75% {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
    100% {
      transform: translate3d(0, 1rem, 0);
      opacity: 0;
    }
  }
</style>
