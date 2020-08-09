<template>
  <div class="logo">
    <p class="logo__fav">My Favorite</p>
    <h1 class="logo__songs">Songs</h1>
  </div>
</template>

<style scoped lang="scss">
.logo {
  position: relative;
  &__fav {
    text-align: left;
    font-size: 0.66rem;
  }
  &__songs {
    margin-top: -3vmin;
    display: inline-block;
    color: $color-accent;
    margin-left: 5.5vmin;
  }
}
</style>
