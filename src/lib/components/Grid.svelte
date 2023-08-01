<div class="grid">
  <slot />
</div>

<style lang="scss">
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1.25rem;
    justify-items: center;
  }

  @media (min-width: 28rem) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 42rem) {
    .grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 50rem) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 58rem) {
    .grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 62.5rem) {
    .grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (min-width: 76rem) {
    .grid {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }

  @media (min-width: 90rem) {
    .grid {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
  }

  @media (min-width: 100rem) {
    .grid {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
  }
</style>
