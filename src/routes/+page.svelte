<script lang="ts">
  import type { PageData } from './$types'
  import { onMount } from 'svelte'
  import { setIsMenuOpen, store } from '$stores'
  import Button from '$components/Button.svelte'

  export let data: PageData

  let sections: {
    title: string
    path: string
    items: (SpotifyApi.AlbumObjectSimplified | SpotifyApi.PlaylistObjectSimplified)[]
  }[] = []

  $: {
    if (data.newReleases) {
      sections.push({
        title: 'New Releases',
        path: '/sections/new-releases',
        items: data.newReleases.albums.items,
      })
    }
    if (data.featuredPlaylists) {
      sections.push({
        title: 'Featured Playlists',
        path: '/sections/featured-playlists',
        items: data.featuredPlaylists.playlists.items,
      })
    }
    data.randomCategories.forEach((category, index) => {
      const categoryPlaylist = data.randomCategoriesPlaylists[index]
      if (categoryPlaylist) {
        sections.push({
          title: category.name,
          path: `/category/${category.id}`,
          items: categoryPlaylist.playlists.items,
        })
      }
    })
    if (data.userPlaylists) {
      sections.push({
        title: 'Your Playlists',
        path: '/playlists',
        items: data.userPlaylists.items,
      })
    }
  }

  onMount(() => {
    const resizeObserver = new ResizeObserver(() => $store.isMenuOpen && setIsMenuOpen(false))
    resizeObserver.observe(document.body)

    return () => resizeObserver.unobserve(document.body)
  })
</script>

<svelte:head>
  {#if $store.isMenuOpen}
    <style>
      body {
        overflow: hidden;
      }
    </style>
  {/if}
</svelte:head>

<div class="home">
  <div class="home__inner">
    {#each sections as section}
      <section class="home__section">
        <header class="home__section-header">
          <h2 class="home__section-title">{section.title}</h2>
          <a href={section.path}>Show all <span class="sr-only">from {section.title}</span></a>
        </header>
        <div class="home__section-content">
          {#each section.items as item}
            <div class="home__section-item">
              <img class="home__section-item__image" src={item.images[0].url} alt="" />
              <div class="home__section-item__info">
                <h3 class="home__section-item__title">{item.name}</h3>
                {#if item.description}
                  <p class="home__section-item__description">{item.description}</p>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</div>

<style lang="scss">
  .home {
    &__inner {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    &__section {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    &__section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__section-content {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1.25rem;
    }

    &__section-item {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: var(--gray-900);
      transition: background-color 0.24s;

      &:focus,
      &:hover {
        background-color: var(--gray-800);
      }

      &__image {
        border-radius: 0.25rem;
      }

      &__title {
        font-size: 1rem;
      }

      &__description {
        margin-top: 0.25rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.8125rem;
        color: var(--gray-300);
      }
    }
  }

  @media (min-width: 28rem) {
    .home {
      &__section-content {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 42rem) {
    .home {
      &__section-content {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 50rem) {
    .home {
      &__section-content {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 62.5rem) {
    .home {
      &__section-content {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 76rem) {
    .home {
      &__section-content {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 90rem) {
    .home {
      &__section-content {
        grid-template-columns: repeat(5, minmax(0, 1fr));
      }
    }
  }

  @media (min-width: 100rem) {
    .home {
      &__section-content {
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }
    }
  }
</style>
