<template>
  <div>
    this is b example
    <button @click="onAlert"> Click Me </button>
  </div>
</template>

<script>
export default {
  name: "b.vue",
  methods :{
    onAlert(){
      alert(1)
    }
  }
}
</script>

<style scoped>

</style>
