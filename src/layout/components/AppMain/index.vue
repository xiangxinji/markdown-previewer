<template>
  <div class="app-main scrollbar" @scroll="onScroll">
    <div class="m-auto" style="padding:0 20px; background-color: white;padding-bottom:40px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import {debounce} from "../../../utils/functions";
import {computed, reactive} from "vue";

export default {
  setup (){
    const state = reactive({
      y : 0
    })

    const onScroll = debounce((e ) =>{
      state.y = e.target.scrollTop
    },200)

    const isTop = computed(()=> state.y === 0)

    return {
      onScroll,
      isTop
    }
  }
}
</script>
<style lang="scss" scoped>
.app-main {
  padding:10px;
  box-shadow: 0 0 5px rgba(0,0,0,.1);
  flex:1;
  overflow-y: auto;
}
</style>
