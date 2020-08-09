<template>
  <div class="spotify" @mouseover="onHoverLink" @mouseleave="onHoverOutLink">
    <div class="line">
      <div class="line__line" :class="{ 'line__line--hover': hoverLink }"></div>
    </div>
    <p class="spotify__text">
      listen
    </p>
  </div>
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
  cursor: pointer;
  &__text {
    position: absolute;
    left: calc(3vmin + 8px);
    font-size: 1.5vmin;
    letter-spacing: 0.08em;
  }
}
.line {
  position: relative;
  width: 3vmin;
  &__line {
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
      console.log('aaaaa')
      this.hoverLink = true
    },
    onHoverOutLink() {
      this.hoverLink = false
    },
  },
}
</script>
