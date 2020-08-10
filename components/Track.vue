<template>
  <img
    :id="track.track.id"
    v-lazy="track.track.album.images[0].url"
    :class="{ hide: !show }"
    class="list__img"
  />
  <!-- <div :id="track.track.id" :class="{ hidden: show }" class="list__img">
    aaaaa
  </div> -->
</template>

<style scoped lang="scss">
.list__img {
  height: 90vmin;
}
.hide {
  visibility: hidden;
}
</style>
<script>
import raf from 'raf'

export default {
  props: ['track', 'parentSize'],
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    this.raf = raf
    this.raf(this.update)
  },
  methods: {
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
