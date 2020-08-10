<template>
  <div class="songs">
    <ul id="list" class="list" :style="{ transform: translate3d }">
      <li class="list__content">
        <img class="list__img" src="~/assets/img/shlohmo.jpg" />
      </li>
      <li class="list__content">
        <img class="list__img" src="~/assets/img/shlohmo.jpg" />
      </li>
      <li class="list__content">
        <img class="list__img" src="~/assets/img/shlohmo.jpg" />
      </li>
      <li class="list__content">
        <img class="list__img" src="~/assets/img/shlohmo.jpg" />
      </li>
      <li class="list__content">
        <img class="list__img" src="~/assets/img/shlohmo.jpg" />
      </li>
      <li class="list__content">
        <img class="list__img" src="~/assets/img/shlohmo.jpg" />
      </li>
      <li class="list__content">
        <img class="list__img" src="~/assets/img/shlohmo.jpg" />
      </li>
      <li class="list__content">
        <img class="list__img" src="~/assets/img/shlohmo.jpg" />
      </li>
      <li class="list__content">
        <img class="list__img" src="~/assets/img/shlohmo.jpg" />
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
  overflow: hidden;
}
.list {
  position: absolute;
  right: 0;
  display: flex;
  will-change: transform;
  transform-origin: right;
  &__content {
    height: 100%;
    list-style: none;
    margin: 0 5vw 0 5vw;
  }
  &__img {
    height: 90vmin;
    background-image: url('~@/assets/img/shlohmo.jpg');
  }
}
</style>
<script>
import raf from 'raf'

export default {
  data() {
    return {
      translate3d: 'translate3d(0, 0 ,0) rotateY(-45deg)',
      currentScrollPosition: 0,
      scrollTarget: 0,
      listWidth: 0,
      atStartOfList: true,
      atEndOfList: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      const element = document.scrollingElement || document.documentElement
      element.addEventListener('wheel', this.transformScroll)
      this.raf = raf
      this.raf(this.update)

      window.addEventListener('resize', this.onResize)
      window.dispatchEvent(new Event('resize'))
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
    transformScroll(event) {
      if (
        !event.deltaY ||
        (this.atStartOfList && event.deltaY < 0) ||
        (this.atEndOfList && event.deltaY > 0)
      ) {
        return
      }
      this.scrollTarget = this.scrollTarget + event.deltaY * -1.25
      event.preventDefault()
    },
    update() {
      this.listWidth =
        document.getElementById('list').scrollWidth -
        window.innerHeight -
        window.innerHeight * 0.05
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
      this.translate3d = `translate3d(${x}px, 0px, ${z}px) rotateY(-45deg)`
      this.raf(this.update)
    },
  },
}
</script>
