<template>
  <div class="container">
    <div class="loading">
      <Loading :loading="loading" />
    </div>
    <div class="left">
      <div class="left__logo">
        <Logo />
      </div>
      <div class="link">
        <div class="link__twitter">
          <Twitter />
        </div>
        <div class="link__spotify">
          <Spotify />
        </div>
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      tracks: [],
    }
  },
  created() {
    axios
      .get('https://us-central1-myfavoritesongs.cloudfunctions.net/playlist')
      .then((response) => {
        this.tracks = response.data.items
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
  position: relative;
  display: flex;
  align-items: center;
  padding-left: $padding-horizontal;
  height: 100vh;
  overflow: hidden;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.left {
  position: relative;
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
.link {
  position: absolute;
  bottom: 2.3vh;
  left: 0;
  display: flex;
  &__twitter {
    margin-right: 2vmin;
  }
}
.discover {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
