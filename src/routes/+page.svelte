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

  $: console.log(sections)

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
          <Button element="a" variant="secondary-outline" href={section.path}>
            Show all <span class="sr-only">from {section.title}</span>
          </Button>
        </header>
        <div class="home__section-content">
          {#each section.items as item}
            <div class="home__section-item">
              <h3>{item.name}</h3>
              <p>{item.type}</p>
            </div>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</div>
