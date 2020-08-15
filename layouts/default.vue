<template>
  <div>
    <Nuxt />
    <span
      v-show="!hoverPlayer"
      id="cursor"
      class="cursor"
      :style="{
        background: cursorBackground,
        border: `0.5px solid ${inverseColor}`,
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
  z-index: $z-cursor;
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
      trackClickAnimationRunnning: false,
    }
  },
  computed: {
    ...mapState('top', ['hoverTrack']),
    ...mapState('description', [
      'currentTrack',
      'cursorAnimationRunning',
      'descriptionVisible',
      'hoverCloseButton',
      'maskBackground',
      'hoverPlayer',
    ]),
    cursorBackground() {
      if (this.hoverSocialLink || this.hoverCloseButton) {
        return 'transparent'
      }
      if (this.cursorAnimationRunning) {
        return this.currentTrack.color
      }
      return this.hoverTrack.color
    },
    inverseColor() {
      if (this.cursorAnimationRunning) {
        return this.currentTrack.inverseColor
      }
      return this.hoverTrack.inverseColor
    },
  },
  watch: {
    cursorAnimationRunning(newValue) {
      if (newValue) {
        const cursor = document.getElementById('cursor')
        const animation = TweenLite.to(cursor, 0.5, {
          width: Math.max(window.innerHeight, window.innerWidth) * 2,
          height: Math.max(window.innerHeight, window.innerWidth) * 2,
          ease: Expo.easeIn,
        })
        animation.eventCallback('onComplete', () => {
          TweenLite.to(cursor, 0, {
            width: Math.max(window.innerHeight, window.innerWidth) * 0.01,
            height: Math.max(window.innerHeight, window.innerWidth) * 0.01,
            ease: Expo.easeIn,
          })
          this.$store.dispatch('description/onCursorAnimationEnd')
        })
      }
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
      if (this.cursorAnimationRunning) {
        return
      }
      const cursor = document.getElementById('cursor')
      const classList = event.target.classList
      this.hoverSocialLink =
        classList.contains('twitter') || classList.contains('spotify')
      if (
        event.target.classList.contains('list__img') ||
        this.hoverSocialLink ||
        this.hoverCloseButton
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
