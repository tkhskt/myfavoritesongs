<template>
  <a
    href="https://open.spotify.com/playlist/5obbBP2vx22GMmYlCwLzPx"
    target="_blank"
    class="spotify"
    @mouseover="onHoverLink"
    @mouseleave="onHoverOutLink"
  >
    <div class="line">
      <div class="line__line" :class="{ 'line__line--hover': hoverLink }"></div>
    </div>
    <p class="spotify__text">
      listen
    </p>
  </a>
</template>

<style scoped lang="scss">
.spotify {
  position: relative;
  font-family: freight-sans-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  display: flex;
  align-items: center;
  width: 7.5vmin;
  height: 2vmin;
  text-decoration: none;
  user-select: none;
  cursor: none;
  color: #000;
  @media screen and (max-width: $breakpoint) {
    width: auto;
    height: auto;
  }
  &__text {
    pointer-events: none;
    position: absolute;
    left: calc(3vmin + 8px);
    font-size: 1.5vmin;
    letter-spacing: 0.08em;
    @media screen and (max-width: $breakpoint) {
      position: relative;
      font-size: 4vmin;
      left: auto;
      color: #1db954;
    }
  }
}
.line {
  position: relative;
  width: 3vmin;
  pointer-events: none;
  @media screen and (max-width: $breakpoint) {
    display: none;
  }
  &__line {
    pointer-events: none;
    position: absolute;
    right: 0;
    width: 100%;
    height: 0.2vmin;
    background: #1db954;
    transition: width 0.2s ease;
  }
  &__line--hover {
    width: 1.5vmin;
    transition: width 0.2s ease;
  }
}
</style>
<script>
export default {
  data() {
    return {
      hoverLink: false,
    }
  },
  methods: {
    onHoverLink() {
      this.hoverLink = true
    },
    onHoverOutLink() {
      this.hoverLink = false
    },
  },
}
</script>
