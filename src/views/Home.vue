<template>
  <div class="home_pic">
    <img src="../assets/home_pic.png" alt="">
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
template{
  height:100%;
  width:100%;
}
img{
  width: 100%;
}
</style>