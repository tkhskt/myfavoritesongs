<template>
  <div class="track-card">
    <div
      class="close-button"
      @mouseover="onHoverClose"
      @mouseleave="onHoverOutClose"
      @click="close"
    >
      <div class="button">
        <div
          class="close-button__line--1"
          :class="{ 'close-button__line--1--hover': hoverCloseButton }"
        ></div>
        <div
          class="close-button__line--2"
          :class="{ 'close-button__line--2--hover': hoverCloseButton }"
        ></div>
      </div>
    </div>
    <div class="description">
      <p class="description__name">{{ currentTrack.name }}</p>
      <p class="description__by">by</p>
      <p class="description__artist">{{ currentTrack.artist }}</p>
      <div
        class="description__divider"
        :style="{ background: currentTrack.color }"
      ></div>
      <iframe
        class="description__player"
        :src="`https://open.spotify.com/embed/track/${currentTrack.id}`"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
        @mouseover="onHoverPlayer"
        @mouseleave="onHoverOutPlayer"
      ></iframe>
    </div>
    <div class="image">
      <img class="image__image" :src="currentTrack.img" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.track-card {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10vmin $padding-horizontal 10vmin $padding-horizontal;
}
.close-button {
  position: absolute;
  top: 50%;
  right: 2vmin;
  top: 2vmin;
  transform-origin: center;
  transform: rotate(45deg);
  .button {
    position: relative;
    pointer-events: none;
    height: 7vmin;
    width: 7vmin;
  }
  &__line--1 {
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 1px;
    top: 50%;
    background: black;
    transition: transform 0.3s ease;
  }
  &__line--2 {
    position: absolute;
    pointer-events: none;
    width: 1px;
    height: 100%;
    left: 50%;
    background: black;
    transition: transform 0.3s ease;
  }
  &__line--1--hover {
    transition: transform 0.3s ease;
    transform: rotate(95deg);
  }
  &__line--2--hover {
    transition: transform 0.3s ease;
    transform: rotate(-95deg);
  }
}
.description {
  background-color: #ffffff;
  height: 100%;
  flex-grow: 1;
  padding: 5vmin 4vw 0 4vw;
  text-align: right;
  &__name {
    font-size: 3.5vw;
  }
  &__by {
    font-size: 1.75vw;
  }
  &__artist {
    font-size: 3.5vw;
  }
  &__divider {
    height: 0.5vmin;
  }
  &__player {
    cursor: default;
    pointer-events: painted;
    margin-top: 3vmin;
    width: 50%;
    height: 80px;
    min-width: 300px;
  }
}
.image {
  height: 100%;
  &__image {
    height: 100%;
    object-fit: contain;
  }
}
</style>
<script>
import { mapState } from 'vuex'

export default {
  props: ['track', 'parentSize'],
  computed: {
    ...mapState('description', ['currentTrack', 'hoverCloseButton']),
  },
  methods: {
    onHoverClose() {
      this.$store.dispatch('description/onHoverCloseButton')
    },
    onHoverOutClose() {
      this.$store.dispatch('description/onHoverOutCloseButton')
    },
    onHoverPlayer() {
      this.$store.dispatch('description/hoverPlayer')
    },
    onHoverOutPlayer() {
      this.$store.dispatch('description/hoverOutPlayer')
    },
    close() {
      this.$store.dispatch('description/closeDescription')
    },
  },
}
</script>
