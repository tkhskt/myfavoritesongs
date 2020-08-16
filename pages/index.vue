<template>
  <div class="container">
    <div class="background-mask" :style="{ background: maskBackground }"></div>
    <section class="container__main">
      <div class="loading" :class="{ 'loading--loaded': !loading }">
        <Loading :loading="loading" />
      </div>
      <div class="left">
        <div class="left__logo">
          <Logo />
        </div>
      </div>
      <div class="right" :class="{ 'right--appear': !loading }">
        <div class="right__songs">
          <Songs :tracks="tracks" />
        </div>
      </div>
      <div class="discover">
        <Discover />
      </div>
    </section>
    <transition name="fade">
      <section
        v-if="!cursorAnimationRunning && descriptionVisible"
        class="description"
      >
        <TrackCard />
      </section>
    </transition>
    <transition name="fade">
      <div
        v-if="!cursorAnimationRunning && descriptionVisible"
        class="page-title"
      >
        <p :style="{ color: titleColor }">
          My Favorite <span class="page-title__songs">Songs</span>
        </p>
      </div>
    </transition>
    <nav>
      <div class="link">
        <div class="link__twitter">
          <Twitter />
        </div>
        <div class="link__spotify">
          <Spotify />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      tracks: [],
    }
  },
  computed: {
    ...mapState('description', [
      'currentTrack',
      'cursorAnimationRunning',
      'descriptionVisible',
      'maskBackground',
    ]),
    titleColor() {
      if (window.innerWidth <= 1350) {
        return this.currentTrack.inverseColor
      }
      return '#000'
    },
  },
  created() {
    axios
      .get('https://us-central1-myfavoritesongs.cloudfunctions.net/playlist')
      .then((response) => {
        this.tracks = response.data.items.reverse()
        this.loading = false
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}
</script>

<style scoped lang="scss">
.container {
  &__main {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: $padding-horizontal;
    height: 100vh;
    overflow: hidden;
  }
}
.background-mask {
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $z-mask;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $z-loading;
  &--loaded {
    pointer-events: none;
  }
}
.left {
  position: relative;
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: $breakpoint) {
    align-items: start;
    margin-top: 2.3vh;
  }
}
.right {
  flex-grow: 1;
  opacity: 0;
  transition: opacity 1.5s linear;
  &__songs {
    right: 0;
  }
  &--appear {
    opacity: 1;
    transition: opacity 1.5s ease;
  }
}
.description {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: $color-primary;
  z-index: $z-description;
}
.page-title {
  position: absolute;
  right: $padding-horizontal;
  bottom: 1.5vh;
  z-index: $z-description;
  font-size: 2vmin;
  @media screen and (max-width: $breakpoint) {
    left: $padding-horizontal;
    top: 2vh;
    bottom: auto;
  }
  &__songs {
    display: inline-block;
    margin-left: 0.5vmin;
    font-size: 3vmin;
    color: $color-accent;
    @media screen and (max-width: $breakpoint) {
      font-size: 7vmin;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.link {
  position: absolute;
  bottom: 2.3vh;
  left: $padding-horizontal;
  display: flex;
  z-index: $z-link;
  @media screen and (max-width: $breakpoint) {
    position: relative;
    font-size: 4vmin;
    color: #1db954;
    bottom: 5vh;
    left: auto;
    padding-left: $padding-horizontal;
    width: 100%;
  }
  &__twitter {
    margin-right: 2vmin;
    @media screen and (max-width: $breakpoint) {
      margin-right: 5vmax;
    }
  }
}
.discover {
  position: absolute;
  right: 0;
  bottom: 0;
  @media screen and (max-width: $breakpoint) {
    visibility: hidden;
  }
}
</style>
