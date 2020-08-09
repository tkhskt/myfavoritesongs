<template>
  <div class="discover">
    <p class="discover__text">scroll to discover</p>
  </div>
</template>

<style scoped lang="scss">
.discover {
  // transform: rotate(-90deg);
  background-color: #000000;
  // transform-origin: bottom left;
  transform: rotate(180deg) translateX(-1px) translateY(-1px);
  &__text {
    font-family: freight-sans-pro, sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 1.5vmin;
    color: #ffffff;
    writing-mode: tb-rl;
    // padding: 0.36vmin 1.6vmin;
    margin: 1.6vmin 0.5vmin 1.6vmin 0.7vmin;
    letter-spacing: 0.08em;
  }
}
</style>
