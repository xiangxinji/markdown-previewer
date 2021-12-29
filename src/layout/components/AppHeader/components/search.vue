<template>
  <div :class="{ 'app-search' : true , 'search__focus' : state.focus , 'mr-10' : true }">
    <input placeholder="请输入搜索内容" type="text" @focus="state.focus = true" @blur="state.focus = false">
  </div>
</template>

<script>
import {reactive} from 'vue'

export default {
  name: "search",
  setup() {
    const state = reactive({
      focus: false
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars";

.app-search {
  height: 35px;
  width: 140px;
  border: solid 1px #efefef;
  border-radius: 20px;
  overflow: hidden;
  transition: all .3s ease-in-out;

  input {
    outline: none;
    width: 100%;
    height: 100%;
    padding-left: 20px;

    &::placeholder {
      font-size: 13px;
    }
  }

  &.search__focus {
    border-color: $primary-color;
    width: 280px;
  }
}
</style>
