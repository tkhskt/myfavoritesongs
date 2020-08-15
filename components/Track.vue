<template>
  <img
    :id="track.track.id"
    :class="{
      hide: !show,
      'list__img--hover': !scrolling && !hover && isHoverTrack,
      'list__img--description-selected': descriptionVisible,
    }"
    class="list__img"
    @mouseover="onHover"
    @mouseleave="onHoverOut"
    @click="onClick"
  />
</template>

<style scoped lang="scss">
.list__img {
  height: 90vmin;
  &--description-selected {
    pointer-events: none;
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
  props: ['track', 'parentSize', 'number'],
  data() {
    return {
      show: false,
      hover: false,
      color: '',
      inverseColor: '',
    }
  },
  computed: {
    ...mapState('top', ['isHoverTrack', 'scrolling']),
    ...mapState('description', ['descriptionVisible']),
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
      if (
        thiefColor[0] * 0.299 + thiefColor[1] * 0.587 + thiefColor[2] * 0.114 >
        186
      ) {
        this.inverseColor = '#000000'
      } else {
        this.inverseColor = '#ffffff'
      }
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
        inverseColor: this.inverseColor,
      })
    },
    onHoverOut() {
      this.hover = false
      this.$store.dispatch('top/onHoverOut')
    },
    onClick() {
      if (this.color === '') {
        return
      }
      const currentTrack = {
        id: this.track.track.id,
        name: this.track.track.name,
        artist: this.track.track.artists[0].name,
        number: this.number,
        img: this.track.track.album.images[0].url,
        genre: [],
        color: this.color,
        inverseColor: this.inverseColor,
      }
      this.$store.dispatch('description/onTrackClick', currentTrack)
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
