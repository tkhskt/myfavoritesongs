<template>
  <div>
    <Nuxt />
    <span
      id="cursor"
      class="cursor"
      :style="{
        background: background,
        border: `0.5px solid ${hoverTrack.inverseColor}`,
      }"
      :class="{ cursor__social: hoverSocialLink }"
    ></span>
  </div>
</template>

<style scoped lang="scss">
.cursor {
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1vmin;
  height: 1vmin;
  min-width: 10px;
  min-height: 10px;
  border: 0.5px solid #000;
  transform: translate3d(-50%, -50%, 0);
  background: #000;
  border-radius: 50% 50%;
  will-change: left top;
  /* mix-blend-mode: difference; */
  z-index: 5000;
  &__social {
    background-color: #fff;
  }
}
</style>
<script>
import { mapState } from 'vuex'
import { TweenLite, Expo } from 'gsap'

export default {
  data() {
    return {
      hoverSocialLink: false,
    }
  },
  computed: {
    ...mapState('top', ['hoverTrack']),
    background() {
      if (this.hoverSocialLink) {
        return 'transparent'
      }
      return this.hoverTrack.color
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.mouseMove)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.mouseMove)
  },
  methods: {
    mouseMove(event) {
      const cursor = document.getElementById('cursor')
      const classList = event.target.classList
      this.hoverSocialLink =
        classList.contains('twitter') || classList.contains('spotify')
      if (
        event.target.classList.contains('list__img') ||
        this.hoverSocialLink
      ) {
        TweenLite.to(cursor, 1, {
          width: window.innerHeight * 0.05,
          height: window.innerHeight * 0.05,
          ease: Expo.easeOut,
        })
      } else {
        TweenLite.to(cursor, 1, {
          width: window.innerHeight * 0.01,
          height: window.innerHeight * 0.01,
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
