<template>
  <header class="app-header">
    <div class="h-full items-center flex px-10">
      <h1 class="text-3xl">
        <router-link to="/">{{ settings.logo }}</router-link>
      </h1>

      <div class="header-left h-full flex">
        <div class="nav-item left text-md" v-for="nav in leftNavs" :key="nav.to">
          <router-link :to="nav.to" class="px-4 h-full">{{ nav.label }}</router-link>
        </div>

      </div>

      <div class="header-right h-full flex text-right ">

        <div class="h-full items-center flex">
          <search></search>
        </div>

        <div class="nav-item right text-md" v-for="nav in rightNavs" :key="nav.to">
          <router-link :to="nav.to" class="px-4 h-full">{{ nav.label }}</router-link>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
import {useProjectSettings} from '@/hooks/useProjectSettings'
import search from './components/search.vue'
export default {
  components:{
    search
  },
  setup() {
    const [settings, {rightNavs, leftNavs}] = useProjectSettings()
    return {
      rightNavs,
      leftNavs,
      settings
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars";

.app-header {
  height: 65px;
  background-color: white;
  box-shadow: 0 2px 8px #f0f1f2;
  border-radius: 3px;
  border-bottom:solid 1px #efefef;
}


.header-right {
  margin-right: 0px;
  margin-left: auto;

  .nav-item:not(:last-child) {
    margin-right: 25px;
  }

}

.nav-item {
  box-sizing: border-box;
  line-height:65px;
  cursor: pointer;
  a{
    border-top: solid 3px transparent;
    display: inline-block;
    transition: border-top-color .3s ease-in-out;
    &:hover {
      color: $primary-color;
      border-top-color: $primary-color;
    }

    &.router-link-active{
      color: $primary-color;
      border-top-color: $primary-color;
    }
  }
}


.header-left {
  margin-left: 40px;

  .nav-item:not(:last-child) {
    margin-right: 25px;
  }
}

</style>
