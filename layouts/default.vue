<template>
  <div>
    <Nuxt />
    <span id="cursor" :style="{ background: hoverTrack.color }"></span>
  </div>
</template>

<style>
#cursor {
  pointer-events: none;
  position: absolute;
  width: 1vmin;
  height: 1vmin;
  min-width: 10px;
  min-height: 10px;
  transform: translate3d(-100%, -100%, 0);
  background: #000;
  border-radius: 50% 50%;
  /* mix-blend-mode: hue; */
  z-index: 5000;
}
</style>
<script>
import { mapState } from 'vuex'
import { TweenLite, Expo } from 'gsap'

export default {
  mounted() {
    window.addEventListener('mousemove', this.mouseMove)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.mouseMove)
  },
  computed: {
    ...mapState('top', ['hoverTrack']),
  },
  methods: {
    mouseMove(event) {
      const cursor = document.getElementById('cursor')
      if (event.target.classList.contains('list__img')) {
        TweenLite.to(cursor, 1, {
          scale: 4,
          ease: Expo.easeOut,
        })
      } else {
        TweenLite.to(cursor, 1, {
          scale: 1,
          ease: Expo.easeOut,
        })
      }
      TweenLite.to(cursor, 0.2, {
        css: {
          left: event.clientX,
          top: event.clientY,
        },
      })
    },
  },
}
</script>
