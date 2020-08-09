<template>
  <div class="container">
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
    <div class="right">
      <div class="right__songs">
        <Songs />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  padding-left: $padding-horizontal;
  height: 100vh;
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
  &__songs {
    right: 0;
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
</style>
