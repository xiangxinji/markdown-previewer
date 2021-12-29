<template>
  <div class="layout-default">
    <app-header></app-header>
    <div class="layout-wrapper">
      <app-aside></app-aside>
      <app-main></app-main>
    </div>
  </div>
</template>


<script>
import AppHeader from './components/AppHeader/index.vue'
import AppMain from './components/AppMain/index.vue'
import AppAside from './components/AppAside/index.vue'


export default {
  components: {
    AppHeader,
    AppMain,
    AppAside
  }
}
</script>


<style lang="scss">
.layout-wrapper{
  display: flex;
  height:calc(100vh - 65px);
  overflow: hidden;
}
</style>
