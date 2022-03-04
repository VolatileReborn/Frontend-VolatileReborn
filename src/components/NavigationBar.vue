<template>
  <nav>

    <div class="logo_container" @click="direct_router('/')" >
      <img src="../assets/logo.png">
      <div class="logo_text">在线众包平台</div>
    </div>
    <div class="route_page_container">
      <div class="check_in_item">
        <el-button type="text" style="font-family: 幼圆;font-weight: bolder;font-size: large" @click="direct_router('/')" >
          首页
        </el-button>
      </div>
      <div class="check_in_item">
          <el-button type="text" style="font-family: 幼圆;font-weight: bolder;font-size: large" @click="direct_router('/taskSquare')" >
            任务广场
          </el-button>
        </div>
    </div>
    <div v-if="nickname === null" class="check_in_container">
      <div class="check_in_item">
        <el-button type="primary" @click="direct_router('/login')" >
        登录
        </el-button>
      </div>
      <div class="check_in_item">
        <el-button type="primary" plain @click="direct_router('/register')" >
          注册
        </el-button>
      </div>
    </div>
    <div v-if="nickname !== null" class="check_in_container">
      <el-button @click="direct_router('/userInfo')">个人中心</el-button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      nickname: window.localStorage.getItem("nickname")
    }
  },
  methods: {
    direct_router(link){
      if(this.$route.path !== link) {
        this.$router.push(link);
      }
    }
  }
}
</script>

<style scoped>
nav{
  width: 100%;
  height: 50px;
  vertical-align: middle;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.logo_container{
  /*margin-top: 5px;*/
  margin-left: 30px;
  height:50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.logo_text{
  font-family: 幼圆;
  font-weight: bolder;
  color: cadetblue;
  margin-left: 10px;
  font-size: large;

  position: relative;
  vertical-align: middle;
}
.route_page_container{
  margin-left: 40px;
  display: flex;
  flex-direction: row;
}

.check_in_container{
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  right: 20px;
}
.check_in_item{
  position: relative;
  vertical-align: middle;
  margin-right: 15px;

}
</style>