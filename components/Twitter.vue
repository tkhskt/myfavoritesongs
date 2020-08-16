<template>
  <a
    href="http://twitter.com/share?url=https://songs.myfavorite.gallery&text=MyFavoriteSongs"
    target="_blank"
    class="twitter"
    @mouseover="onHoverLink"
    @mouseleave="onHoverOutLink"
  >
    <div class="line">
      <div class="line__line" :class="{ 'line__line--hover': hoverLink }"></div>
    </div>
    <p class="twitter__text">
      share
    </p>
  </a>
</template>

<style scoped lang="scss">
.twitter {
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
    position: absolute;
    pointer-events: none;
    left: calc(3vmin + 8px);
    font-size: 1.5vmin;
    letter-spacing: 0.08em;
    @media screen and (max-width: $breakpoint) {
      position: relative;
      font-size: 4vmin;
      left: auto;
      color: #1da1f2;
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
    position: absolute;
    pointer-events: none;
    right: 0;
    width: 100%;
    height: 0.2vmin;
    background: #1da1f2;
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
