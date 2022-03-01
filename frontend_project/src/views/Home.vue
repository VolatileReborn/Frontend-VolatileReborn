<template>
  <div>
    <div class="hello">
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data (){
    return {
      msg: 'HELLO!'
    }
  }
}
</script>

<style scoped>

</style>