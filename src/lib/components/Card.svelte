<script lang="ts">
  import { IconMusic } from '@tabler/icons-svelte'

  type AlbumType = SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified
  type PlaylistType = SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified
  type ArtistType = SpotifyApi.ArtistObjectFull

  export let item: AlbumType | PlaylistType | ArtistType
</script>

<div class="card">
  {#if item.images?.length}
    <img
      class="card__image"
      src={item.images[0].url}
      alt="{item.type} cover for {item.name}"
      loading="lazy"
    />
  {:else}
    <div class="card__image-placeholder"><IconMusic size={80} /></div>
  {/if}
  <div class="card__info">
    <h3 class="card__title">
      <a href="/{item.type}/{item.id}" title={item.name} draggable="false">{item.name}</a>
    </h3>
    {#if item.type === 'album'}
      <p class="card__artists">{item.artists.map((artist) => artist.name).join(', ')}</p>
    {:else if item.type === 'playlist'}
      <p class="card__description">{item.description}</p>
    {/if}
  </div>
</div>

<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: var(--gray-900);
    transition: background-color 0.24s;
    position: relative;

    &:focus,
    &:hover {
      background-color: var(--gray-800);
    }

    &__image {
      border-radius: 0.25rem;
    }

    &__image-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      aspect-ratio: 1;
      border-radius: 0.25rem;
      background-color: var(--gray-700);
    }

    &__title {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 1rem;
      font-weight: 600;

      a {
        text-decoration: none;
        outline: none;

        &::after {
          content: '';
          position: absolute;
          inset: 0;
        }

        &:focus-visible {
          &::after {
            outline: 3px solid var(--white-rich);
            border-radius: 0.5rem;
          }
        }
      }
    }

    &__artists,
    &__description {
      margin-top: 0.25rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 0.8125rem;
      color: var(--gray-300);
    }
  }
</style>
