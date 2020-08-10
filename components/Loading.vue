<template>
  <div class="loading" :class="{ loading__completed: !loading }">
    <Logo />
  </div>
</template>

<style scoped lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: $color-primary;
  opacity: 1;
  z-index: 100;
  transition: all 1s ease;
  &__completed {
    opacity: 0;
    z-index: 0;
  }
}
</style>
<script>
export default {
  props: ['loading'],
}
</script>
