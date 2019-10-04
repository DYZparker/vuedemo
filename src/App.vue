<template>
  <div id="app">
    <transition name='component-fade' mode='out-in'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scope>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>
