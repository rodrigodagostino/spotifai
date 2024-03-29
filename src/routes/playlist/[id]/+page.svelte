<script lang="ts">
  import { IconArrowLeft, IconArrowRight, IconHeart, IconHeartFilled } from '@tabler/icons-svelte';

  import type { PageData } from './$types';
  import type { ActionData } from '../$types';
  import type { ActionData as EditActionData } from './edit/$types';
  import { applyAction, enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import { addToast } from '$stores/toasts';
  import formatFollowers from '$helpers/format-followers';
  import ItemPage from '$components/ItemPage.svelte';
  import TrackList from '$components/TrackList.svelte';
  import Button from '$components/Button.svelte';
  import Modal from '$components/Modal.svelte';
  import PlaylistForm from '$components/PlaylistForm.svelte';
  import MicroModal from 'micromodal';

  export let data: PageData;
  export let form: ActionData | EditActionData;

  $: playlist = data.playlist;
  $: color = data.color;
  $: tracks = data.playlist.tracks;
  $: isFollowing = data.isFollowing;
  $: currentPageNumber = $page.url.searchParams.get('page') || 1;

  let filteredTracks: SpotifyApi.TrackObjectFull[];
  let followButton: Button<'button'>;
  let isPostingFollow = false;
  let isLoadingMore = false;

  $: {
    filteredTracks = [];
    tracks.items.forEach((item) => {
      if (item.track) filteredTracks = [...filteredTracks, item.track];
    });
  }

  const loadMore = async () => {
    if (!tracks.next) return;

    isLoadingMore = true;
    const response = await fetch(
      tracks.next.replace('https://api.spotify.com/v1/', '/api/spotify/')
    );
    const responseJSON = await response.json();
    if (response.ok) {
      tracks = {
        ...responseJSON,
        items: [...tracks.items, ...responseJSON.items],
      };
    } else {
      addToast('error', responseJSON.error.message || 'Could not load more tracks.');
    }
    isLoadingMore = false;
  };
</script>

<ItemPage
  type={playlist.type}
  title={playlist.name}
  image={playlist.images.length > 0 ? playlist.images[0].url : undefined}
  {color}
>
  <p slot="description" class="playlist__description">{@html playlist.description}</p>
  <p slot="meta" class="playlist__meta">
    <span class="playlist__owner">{playlist.owner.display_name}</span>
    <span class="playlist__followers">
      {formatFollowers.format(playlist.followers.total)} followers
    </span>
    <span class="playlist__total-tracks">
      {playlist.tracks.total}
      {playlist.tracks.total === 1 ? 'song' : 'songs'}
    </span>
  </p>

  <div class="playlist__actions">
    {#if data.user?.id === playlist.owner.id}
      <Button
        element="a"
        href="/playlist/{playlist.id}/edit"
        variant="secondary-outline"
        on:click={(e) => {
          e.preventDefault();
          MicroModal.show('edit-playlist-modal');
        }}
      >
        Edit playlist
      </Button>
    {:else if isFollowing !== null}
      <form
        class="playlist__follow-form"
        method="POST"
        action={`?/${isFollowing ? 'unfollowPlaylist' : 'followPlaylist'}`}
        use:enhance={() => {
          isPostingFollow = true;
          return async ({ result }) => {
            followButton.contentEditable = false;
            if (result.type === 'success') {
              await applyAction(result);
              isFollowing = !isFollowing;
              invalidateAll();
            } else if (result.type === 'failure') {
              addToast('error', result.data?.followError);
            } else {
              await applyAction(result);
            }
            followButton.focus();
          };
        }}
      >
        <Button
          bind:this={followButton}
          element="button"
          type="submit"
          variant="ghost"
          padding="medium"
          disabled={isPostingFollow}
        >
          {#if isFollowing}
            <IconHeartFilled size={40} />
          {:else}
            <IconHeart size={40} />
          {/if}
          <span class="sr-only">
            {isFollowing ? 'Unfollow' : 'Follow'}
            {playlist.name} playlist
          </span>
        </Button>
      </form>
    {/if}
  </div>
  {#if tracks.items.length > 0}
    <TrackList
      type={playlist.type}
      tracks={filteredTracks}
      userPlaylists={data.userPlaylists?.filter((playlist) => playlist.owner.id === data.user?.id)}
      isOwner={data.user?.id === playlist.owner.id}
    />
    {#if tracks.next}
      <div class="playlist__load-more">
        {#if !isLoadingMore}
          <Button
            element="button"
            variant="secondary-outline"
            disabled={isLoadingMore}
            on:click={loadMore}
          >
            Load more
          </Button>
        {:else}
          <div class="playlist__loading-animation">
            <span class="playlist__loading-animation__dot-one" />
            <span class="playlist__loading-animation__dot-two" />
            <span class="playlist__loading-animation__dot-three" />
          </div>
        {/if}
      </div>
    {/if}
    <div class="playlist__pagination">
      {#if tracks.previous}
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
      {#if tracks.next}
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
  {:else}
    <div class="playlist__no-tracks">
      <h2>No songs have been added to this playlist.</h2>
      <div class="playlist__buttons">
        <Button element="a" href="/search">Search for a different playlist</Button>
        <Button element="a" href="/playlists" variant="ghost">Go to your library</Button>
      </div>
    </div>
  {/if}
</ItemPage>

<Modal id="edit-playlist-modal" title="Edit {playlist.name}">
  <PlaylistForm
    form={form && 'editForm' in form ? form : null}
    userId={data.user?.id}
    {playlist}
    action="/playlist/{playlist.id}/edit"
    on:success={() => {
      MicroModal.close('edit-playlist-modal');
      // invalidate(`/api/spotify/playlists/${playlist.id}`);
      invalidateAll();
    }}
  />
</Modal>

<style lang="scss">
  :global(.no-js) {
    .playlist {
      &__load-more {
        display: none;
      }

      &__pagination {
        display: block;
      }
    }
  }

  .playlist {
    &__description {
      color: var(--gray-300);

      &:empty {
        display: none;
      }
    }

    &__meta {
      display: flex;
      justify-content: center;
      margin-top: 0.5rem;

      * + * {
        &::before {
          content: '•';
          margin: 0 0.325em;
        }
      }
    }

    &__actions {
      margin-bottom: 0.5rem;
    }

    &__follow-form {
      :global(.tabler-icon-heart-filled path) {
        fill: var(--spotify-text);
      }
    }

    &__load-more,
    &__pagination {
      margin-top: 1.5rem;
      text-align: center;
    }

    &__pagination {
      display: none;
    }

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

    &__no-tracks {
      padding-top: 2rem;
      text-align: center;
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-top: 2rem;
    }
  }

  @media (min-width: 50rem) {
    .playlist {
      &__meta {
        justify-content: initial;
      }
    }
  }
</style>
