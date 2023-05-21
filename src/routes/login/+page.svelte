<script lang="ts">
  import Button from '$components/Button.svelte'
  import SpotifyLogo from '$components/SpotifyLogo.svelte'
</script>

<div class="login">
  <div class="login__inner">
    <SpotifyLogo />
    <h1 class="login__title">Get Premium free for 1 month</h1>
    <p class="login__description">
      Enjoy ad-free music listening, offline playback, and more. Cancel anytime.
    </p>
    <div class="login__buttons">
      <Button element="a" variant="secondary-outline" href="https://www.spotify.com/signup">
        Sign up
      </Button>
      <Button element="a" variant="primary-solid" href="/api/auth/login">Log in</Button>
    </div>
  </div>
</div>

<style lang="scss">
  .login {
    min-height: 100vh;
    padding-inline: 1.25rem;
    background-image: linear-gradient(55deg, var(--black), var(--black-rich));

    &__inner {
      width: 100%;
      max-width: 77.5rem;
      padding-top: 28vh;
      margin: 0 auto;
    }

    :global(.spotify-logo) {
      height: 4rem;
    }

    &__title {
      font-size: 2.5rem;
      margin-top: 2rem;
    }

    &__description {
      font-size: 1.5rem;
      margin-top: 1.5rem;
    }

    &__buttons {
      display: flex;
      gap: 0.75rem;
      margin-top: 3rem;
    }
  }

  @media (min-width: 37.5em) {
    .login {
      padding-inline: 2rem;
    }
  }
</style>
