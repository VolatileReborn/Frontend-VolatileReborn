<template>
  <div style="display:flex;text-align: center;justify-content: center">
    <div style="padding-top: 50px;font-weight: bolder;font-size: xx-large">注   册   成   功</div>
  </div>
  <el-result>
    <template #icon>
      <img src="../../assets/success.png">
    </template>
    <template #title>
      <div style="font-weight: bolder;font-size:xx-large">你好，欢迎加入众包世界 </div>
    </template>
    <template #extra>
      <el-button v-if="this.role === '1'" type="primary" plain size="large" @click="direct_route('/fillProfile')">立即完善个人资料</el-button>
      <el-button v-if="this.role === '0'" type="primary" plain size="large" @click="direct_route('/login')">立即登录</el-button>
    </template>
  </el-result>
</template>

<script>
export default {
  name: "RegisterSucceed",
  data(){
    return{
      role:this.$route.query.role
    }
  },
  methods: {
    direct_route(link){
      this.$router.push(link);
    }
  },
  
}
</script>

<style scoped>

</style>