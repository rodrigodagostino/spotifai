<script lang="ts">
  import type { PageData } from './$types';
  import { onMount } from 'svelte';
  import { setIsMenuOpen, navigation } from '$stores/navigation';
  import Card from '$components/Card.svelte';
  import CardList from '$components/CardList.svelte';

  export let data: PageData;

  let sections: {
    title: string;
    path: string;
    items: (SpotifyApi.AlbumObjectSimplified | SpotifyApi.PlaylistObjectSimplified)[];
  }[] = [];

  $: {
    if (data.newReleases) {
      sections.push({
        title: 'New Releases',
        path: '/sections/new-releases',
        items: data.newReleases.albums.items,
      });
    }
    if (data.featuredPlaylists) {
      sections.push({
        title: 'Featured Playlists',
        path: '/sections/featured-playlists',
        items: data.featuredPlaylists.playlists.items,
      });
    }
    data.randomCategories.forEach((category, index) => {
      const categoryPlaylist = data.randomCategoriesPlaylists[index];
      if (categoryPlaylist) {
        sections.push({
          title: category.name,
          path: `/category/${category.id}`,
          items: categoryPlaylist.playlists.items,
        });
      }
    });
    if (data.userPlaylists) {
      sections.push({
        title: 'Your Playlists',
        path: '/playlists',
        items: data.userPlaylists.items,
      });
    }
  }

  onMount(() => {
    const resizeObserver = new ResizeObserver(() => $navigation.isMenuOpen && setIsMenuOpen(false));
    resizeObserver.observe(document.body);

    return () => resizeObserver.unobserve(document.body);
  });
</script>

<svelte:head>
  {#if $navigation.isMenuOpen}
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
        <header class="home__section__header">
          <h2 class="home__section__title">{section.title}</h2>
          <a href={section.path}>Show all <span class="sr-only">from {section.title}</span></a>
        </header>
        <CardList>
          {#each section.items as item}
            <Card {item} />
          {/each}
        </CardList>
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

    &__section__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
