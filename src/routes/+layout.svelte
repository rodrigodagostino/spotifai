<script lang="ts">
  import type { LayoutData } from './$types'
  import './styles.css'

  export let data: LayoutData
</script>

{data.user?.display_name}

<slot />
