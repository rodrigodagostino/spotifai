<script lang="ts">
  import type { PageData } from './$types';
  import formatFollowers from '$helpers/format-followers';
  import ItemPage from '$components/ItemPage.svelte';
  import CardList from '$components/CardList.svelte';
  import Card from '$components/Card.svelte';
  import Button from '$components/Button.svelte';
  import { invalidate } from '$app/navigation';

  export let data: PageData;

  $: user = data.user;
  $: color = data.color;
  $: following = data.following;

  let isRetrying = false;
</script>

<ItemPage
  type={user?.type}
  title={user?.display_name || ''}
  image={user?.images && user.images.length > 0 ? user?.images.at(-1)?.url : undefined}
  {color}
>
  <p slot="meta" class="profile-page__meta">
    <span class="profile-page__followers">
      {formatFollowers.format(user?.followers?.total || 0)} followers
    </span>
  </p>

  {#if following === undefined}
    <div class="profile-page__error">
      <h2>Failed to load data.</h2>
      <Button
        element="button"
        disabled={isRetrying}
        on:click={async () => {
          isRetrying = true;
          await invalidate((url) => url.pathname === '/api/spotify/me/following');
          isRetrying = false;
        }}
      >
        Retry
      </Button>
    </div>
  {/if}

  {#if following && following.artists.items.length > 0}
    <div class="profile-page__section">
      <header class="profile-page__section__header">
        <h2 class="profile-page__section__title">Following</h2>
      </header>
      <CardList>
        {#each following.artists.items as artist (artist.id)}
          <Card item={artist} />
        {/each}
      </CardList>
      <div class="profile-page__section__view-all">
        <Button element="a" href="/profile/artists" variant="secondary-outline">
          View all<span class="sr-only">the artists you are following</span>
        </Button>
      </div>
    </div>
  {/if}
</ItemPage>

<style lang="scss">
  .profile-page {
    &__meta {
      margin-top: 0.5rem;
    }

    &__error {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      text-align: center;
    }

    &__section {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    &__section__view-all {
      margin-top: 0.75rem;
      text-align: center;
    }
  }
</style>
