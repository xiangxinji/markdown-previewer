<template>
  <aside class="app-aside">

    <div v-for="item in data">
      <a :href="'#' +item.title"> {{ item.title }}</a>
    </div>
  </aside>
</template>

<script>
import {computed} from 'vue'
import {useAsideContext} from '@/store/asideContext'

export default {
  name: "index",
  setup() {
    const asideContext = useAsideContext()
    const data = computed(() => asideContext.currentAsideTree)
    return {
      data
    }
  }
}
</script>

<style lang="scss" scoped>
.app-aside {
  width: 12%;
  min-width: 270px;
  padding-left: 40px;
  background-color: white;
  padding-top: 25px;
}
</style>
