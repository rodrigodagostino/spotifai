<script lang="ts">
  import type { PageData } from './$types'
  import getCopyrightSymbol from '$components/helpers/copyright-symbol'

  export let data: PageData

  $: album = data.album
</script>

<h1>{album.name}</h1>

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
