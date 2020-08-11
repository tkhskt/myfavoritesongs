<template>
  <img
    :id="track.track.id"
    :class="{
      hide: !show,
      'list__img--hover': !scrolling && !hover && isHoverTrack,
    }"
    class="list__img"
    @mouseover="onHover"
    @mouseleave="onHoverOut"
  />
  <!-- <div :id="track.track.id" :class="{ hidden: show }" class="list__img">
    aaaaa
  </div> -->
</template>

<style scoped lang="scss">
.list__img {
  height: 90vmin;
  &--hover {
    // filter: blur(10px);
  }
}
.hide {
  visibility: hidden;
}
</style>
<script>
import raf from 'raf'
import { mapState } from 'vuex'
import ColorThief from 'colorthief'

export default {
  props: ['track', 'parentSize'],
  data() {
    return {
      show: false,
      hover: false,
      color: '',
    }
  },
  computed: {
    ...mapState('top', ['isHoverTrack', 'scrolling']),
  },
  mounted() {
    const rgbToHex = (r, g, b) =>
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16)
          return hex.length === 1 ? '0' + hex : hex
        })
        .join('')
    const img = document.getElementById(this.track.track.id)
    img.onload = () => {
      const colorThief = new ColorThief()
      const thiefColor = colorThief.getColor(img)
      this.color = rgbToHex(thiefColor[0], thiefColor[1], thiefColor[2])
    }
    img.crossOrigin = 'Anonymous'
    img.src = this.track.track.album.images[0].url
    this.raf = raf
    this.raf(this.update)
  },
  methods: {
    onHover() {
      this.hover = true
      this.$store.dispatch('top/onHover', {
        id: this.track.track.id,
        name: this.track.track.name,
        color: this.color,
      })
    },
    onHoverOut() {
      this.hover = false
      this.$store.dispatch('top/onHoverOut')
    },
    update() {
      if (document.getElementById(this.track.track.id) == null) {
        return false
      }
      const trackElement = document.getElementById(this.track.track.id)
      const elementRight = trackElement.getBoundingClientRect().right
      const elementLeft = trackElement.getBoundingClientRect().left
      const appearingMargin = window.innerHeight * 0.09
      if (
        (this.parentSize.left < elementRight + appearingMargin &&
          elementLeft < this.parentSize.right) ||
        window.innerWidth <= 1350
      ) {
        this.show = true
        this.raf(this.update)
        return
      }
      this.show = false
      this.raf(this.update)
    },
  },
}
</script>
