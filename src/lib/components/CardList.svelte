<div class="card-list">
  <slot />
</div>

<style lang="scss">
  .card-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1.25rem;
  }

  @media (min-width: 28rem) {
    .card-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 42rem) {
    .card-list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 50rem) {
    .card-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 62.5rem) {
    .card-list {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 76rem) {
    .card-list {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (min-width: 90rem) {
    .card-list {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }

  @media (min-width: 100rem) {
    .card-list {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
  }
</style>
