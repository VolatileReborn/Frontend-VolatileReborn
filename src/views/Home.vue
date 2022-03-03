<template>
  <div class="home_pic">
    <img src="../assets/home_pic.png">
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
  },
  components:{

  }
}
</script>

<style scoped>
img{
  width: 100%;
  height: 555px;
}
</style>