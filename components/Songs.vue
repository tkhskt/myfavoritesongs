<template>
  <div id="songs" class="songs">
    <ul id="list" class="list" :style="{ transform: translate3d }">
      <li
        v-for="(track, index) in tracks"
        :key="track.track.id"
        class="list__content"
      >
        <Track
          :track="track"
          :parent-size="parentSize"
          :number="tracks.length - index"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.songs {
  width: 54vw;
  height: 90vmin;
  margin-left: auto;
  transform-style: preserve-3d;
  perspective: 1000px;
}
.list {
  position: absolute;
  right: 0;
  display: flex;
  will-change: transform;
  transform-origin: right;
  backface-visibility: visible;
  &__content {
    height: 100%;
    list-style: none;
    margin: 0 5vw 0 5vw;
  }
  &__img {
    height: 90vmin;
  }
}
</style>
<script>
import raf from 'raf'

export default {
  props: ['tracks'],
  data() {
    return {
      translate3d: 'translate3d(0, 0 ,0) rotateY(-45deg)',
      currentScrollPosition: 0,
      scrollTarget: 0,
      listWidth: 0,
      atStartOfList: true,
      atEndOfList: false,
      perspective: 900,
      parentSize: {
        left: 0,
        right: 0,
      },
      touchStartX: 0,
    }
  },
  mounted() {
    this.$nextTick(() => {
      const element = document.scrollingElement || document.documentElement
      element.addEventListener('wheel', this.transformScroll)
      element.addEventListener('touchstart', this.touchStart)
      element.addEventListener('touchmove', this.transformTouchMove)
      this.raf = raf
      this.raf(this.update)

      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.currentScrollPosition = 0
      this.scrollTarget = 0
    },
    touchStart() {
      this.touchStartX = event.touches[0].pageX
    },
    transformScroll(event) {
      if (
        !event.deltaY ||
        (this.atStartOfList && event.deltaY < 0) ||
        (this.atEndOfList && event.deltaY > 0)
      ) {
        return
      }
      this.scrollTarget = this.scrollTarget + event.deltaY * -1.25
      // event.preventDefault()
    },
    transformTouchMove(event) {
      const deltaX = this.touchStartX - event.touches[0].pageX
      this.touchStartX = event.touches[0].pageX
      if (
        (this.atStartOfList && deltaX < 0) ||
        (this.atEndOfList && deltaX > 0)
      ) {
        return
      }
      this.scrollTarget = this.scrollTarget + deltaX * -4
    },
    update() {
      this.listWidth =
        document.getElementById('list').scrollWidth -
        window.innerHeight -
        window.innerHeight * 0.05
      if (window.innerWidth <= 1350) {
        this.listWidth =
          document.getElementById('list').scrollWidth -
          Math.min(window.innerHeight, window.innerWidth)
      }
      const parent = document.getElementById('songs').getBoundingClientRect()
      this.parentSize = {
        left: parent.left,
        right: parent.right,
      }
      if (this.currentScrollPosition <= 0 && this.scrollTarget < 0) {
        this.atStartOfList = true
        this.scrollTarget = 0
        this.raf(this.update)
        return
      } else if (
        this.currentScrollPosition >= this.listWidth &&
        this.scrollTarget > this.currentScrollPosition
      ) {
        this.atEndOfList = true
        this.scrollTarget = this.listWidth
        this.raf(this.update)
        return
      }
      this.atStartOfList = false
      this.atEndOfList = false
      this.currentScrollPosition =
        this.currentScrollPosition +
        (this.scrollTarget - this.currentScrollPosition) * 0.1

      const x = this.currentScrollPosition * Math.cos((45 * Math.PI) / 180)
      const z = this.currentScrollPosition * Math.sin((45 * Math.PI) / 180)
      if (window.innerWidth <= 1350) {
        this.translate3d = `translate3d(${this.currentScrollPosition}px, 0px, 0px) rotateY(0)`
        this.raf(this.update)
        return
      }
      if (Math.abs(this.scrollTarget - this.currentScrollPosition) < 100) {
        this.$store.dispatch('top/onScrollStop')
      } else {
        this.$store.dispatch('top/onScroll')
      }
      this.translate3d = `translate3d(${x}px, 0px, ${z}px) rotateY(-45deg)`
      this.raf(this.update)
    },
  },
}
</script>
