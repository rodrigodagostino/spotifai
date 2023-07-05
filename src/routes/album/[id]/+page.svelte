<script lang="ts">
  import type { PageData } from './$types'
  import getCopyrightSymbol from '$components/helpers/copyright-symbol'
  import ItemPage from '$components/ItemPage.svelte'

  export let data: PageData

  $: album = data.album
</script>

<ItemPage
  title={album.name}
  type={album.album_type}
  color={null}
  image={album.images.length ? album.images[0].url : undefined}
>
  <p class="album__meta" slot="meta">
    <span class="album__artists">{album.artists.map((artist) => artist.name).join(', ')}</span>
    <span class="album__date">{new Date(album.release_date).getFullYear()}</span>
    <span class="album__total-tracks">
      {album.total_tracks}
      {album.total_tracks === 1 ? 'song' : 'songs'}
    </span>
  </p>
  <ul class="album__tracks">
    {#each album.tracks.items as track}
      <li>{track.name}</li>
    {/each}
  </ul>

  <div class="album__credits">
    <p class="album__release-date">
      {new Date(album.release_date).toLocaleDateString('en', { dateStyle: 'medium' })}
    </p>
    {#each album.copyrights as copyright}
      <p class="album__copyright">{getCopyrightSymbol(copyright.type)}{copyright.text}</p>
    {/each}
  </div>
</ItemPage>
