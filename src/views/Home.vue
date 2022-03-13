<template>
  <div class="home_pic" >
    <el-carousel height="90vh" style="text-align: center" interval="4000">
      <el-carousel-item v-for="item in pics" :key="item" >
        <el-image :src="item.path" alt="" style="height: 90vh;"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data (){
    return {
      msg: 'HELLO!',
      pics:[
        {path: require("../assets/home_pic_1.png")},
        {path: require("../assets/home_pic_2.jpg")}
      ]
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
</style>