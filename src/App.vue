<template>
  <div class="markdown-app">
    <component :is="LayoutComp"></component>
  </div>
</template>

<script>
import DefaultLayout from './layout/default.vue'
import {useRoute} from 'vue-router'
import {computed} from 'vue'

export default {
  components: {
    Default: DefaultLayout,
  },
  setup() {
    const route = useRoute()

    const LayoutComp = computed(() => route.meta.layout || 'default')

    return {
      LayoutComp
    }
  }

}
</script>

<style scoped>

</style>
