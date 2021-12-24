<template>
  <div class="layout-default">
    <app-header></app-header>

    <app-main></app-main>
  </div>
</template>


<script>
import AppHeader from './components/AppHeader/index.vue'
import AppMain from './components/AppMain/index.vue'

export default {
  components: {
    AppHeader,
    AppMain
  }
}
</script>
