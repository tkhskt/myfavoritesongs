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
  overflow: hidden;
  will-change: transform;
  // transform: rotateY(-45deg);
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
    const element = document.scrollingElement || document.documentElement
    element.addEventListener('wheel', this.transformScroll)
    const listElement = document.getElementById('list')
    this.listWidth = listElement.offsetWidth * 5
    this.raf = raf
    this.raf(this.update)
  },
  methods: {
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
