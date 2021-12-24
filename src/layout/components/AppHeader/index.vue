<template>
  <header class="app-header">
    <div class="container m-auto h-full items-center flex">
      <h1 class="text-3xl">
        <router-link to="/">logo</router-link>
      </h1>


      <div class="header-right flex text-right">
        <div class="nav-item right text-md">
          <router-link to="">导航1</router-link>
        </div>

        <div class="nav-item right text-md">
          <router-link to="">导航2</router-link>
        </div>
        <div class="nav-item right text-md">
          <router-link to="">导航3</router-link>
        </div>
      </div>

    </div>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/vars";

.app-header {
  height: 65px;
  background-color: white;
  box-shadow: -1px -1px 7px rgba(0, 0, 0, .3);
  border-radius: 3px;
}


.header-right {
  margin-right: 0px;
  margin-left: auto;

  .nav-item {
    &:hover {
      color: $primary-color;
    }
  }

  .nav-item:not(:last-child) {
    margin-right: 25px;
  }


}

</style>
