<template>
  <div class="home_container" >
<!--    <el-carousel height="90vh" style="text-align: center" >-->
<!--      <el-carousel-item v-for="item in pics" :key="item" >-->
<!--        <el-image :src="item.path" alt="" style="height: 90vh;"/>-->
<!--      </el-carousel-item>-->
<!--    </el-carousel>-->
    <div class="info_container">
      <div class="big_info">汇聚测试人才，提升软件质量</div>
      <div class="small_info">智能化的众包测试平台，更优的推荐，更准的聚合</div>
      <el-button class="btn" v-if="this.role === null" @click="this.$router.push('/login')" round>立即加入</el-button>
    </div>
  </div>
  <div class="intro_container">
    <div class="employ_container">
      <div class="char1_card">
        <div style="font-family: 幼圆;font-size: xx-large;color: white">发包方</div>
        <div style="font-family: 幼圆;font-size: small;color: white;margin-top: 10px">提供软件信息，收获缺陷报告</div>
      </div>
      <div class="white_card">
        <div style="width: 30vw;" >发布众测任务信息，上传软件相关文件，众测网站为您寻找优质测试工人进行离线软件测试</div>
        <div style="width: 1vw"></div>
        <div style="display: flex;flex-direction: column;position:relative;width: 11vw">
          <div class="check_item">
            <el-icon color="#42b983"><Check /></el-icon>
            上传任务简单快速
          </div>
          <div class="check_item">
            <el-icon color="#42b983"><Check /></el-icon>
            缺陷报告智能处理
          </div>
          <div class="check_item">
            <el-icon color="#42b983"><Check /></el-icon>
            报告数据可视化
          </div>
        </div>
      </div>
      <div class="char2_card">
        <div style="font-family: 幼圆;font-size: xx-large;color: white">众测工人</div>
        <div style="font-family: 幼圆;font-size: small;color: white;margin-top: 10px">报名众测任务，提交缺陷报告</div>
      </div>
      <div class="white_card" style="top:-17vh">
        <div style="width: 30vw;" >查看正在进行的众测任务，报名进行众测，离线完成测试任务并提交缺陷报告，对同任务报告进行协作</div>
        <div style="width: 1vw"></div>
        <div style="display: flex;flex-direction: column;position:relative;width: 11vw">
          <div class="check_item">
            <el-icon color="#42b983"><Check /></el-icon>
            查看多样众测任务
          </div>
          <div class="check_item">
            <el-icon color="#42b983"><Check /></el-icon>
            缺陷报告在线填写
          </div>
          <div class="check_item">
            <el-icon color="#42b983"><Check /></el-icon>
            推荐报告进行协作
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="join_container">
    <div style="font-weight: bolder;color: white;font-family: 幼圆;font-size:xx-large">加入众测，收获多多</div>
    <div style="color: skyblue;font-size: small;font-family: 幼圆;margin-top: 5px;">协作式众测平台，多种测试任务类型由你选择</div>
    <div style="color:skyblue;font-size: small;font-family: 幼圆;margin-top: 5px;">在线任务及报告管理，快捷一键式操作，可视化图表清晰展示报告关系</div>
    <div style="display: flex;flex-direction:row; margin-top: 10vh">
      <div class="advantage_container" style="margin-left: 0">
        <div>
          <el-image :src="this.pics[0].path" class="advantage_icon"/>
          <div class="advantage_info">项目便捷管理</div>
        </div>
      </div>
      <div class="advantage_container">
        <div>
          <el-image :src="this.pics[1].path" class="advantage_icon"/>
          <div class="advantage_info">报告在线协作</div>
        </div>
      </div>
      <div class="advantage_container">
        <div>
          <el-image :src="this.pics[2].path" class="advantage_icon"/>
          <div class="advantage_info">报告数据可视化</div>
        </div>
      </div>
      <div class="advantage_container">
        <div>
          <el-image :src="this.pics[3].path" class="advantage_icon"/>
          <div class="advantage_info">针对性报告推荐</div>
        </div>
      </div>
    </div>
  </div>
  <div class="contact_container">
    <div class="contact_item">
      <div style="color: gray;font-size: small">快速开始</div>
      <div style="color:white;margin-top: 10px" @click="goLogin">登录注册</div>
      <div style="color:white;margin-top: 10px" @click="this.$router.push('/taskSquare')">在线任务</div>
    </div>
    <div class="contact_item">
      <div style="color: gray;font-size: small">联系我们</div>
      <div style="color:white;margin-top: 10px">邮箱：1731393946@qq.com</div>
    </div>
    <div class="contact_item" style="align-items: center">
      <el-divider direction="vertical" />
    </div>
    <div class="contact_item" style="align-items: center">
      <div style="color: gray;font-size: small">移动端访问</div>
      <el-image :src="this.pics[4].path" style="height: 15vh;margin-top: 10px"/>
    </div>
  </div>
</template>

<script>
import {Check} from "@element-plus/icons-vue"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  inject:['reload'],
  data (){
    return {
      pics:[
        {path: require("../assets/project_manage.png")},
        {path: require("../assets/cooperation.png")},
        {path: require("../assets/scatter.png")},
        {path: require("../assets/recommend.png")},
        {path: require("../assets/website.png")}
      ],
      role:window.localStorage.getItem("role")
    }
  },
  components:{
    Check
  },
  methods:{
    goLogin() {
      window.localStorage.clear();
      this.$router.push("/login")
      this.reload()
    }
  }
}
</script>

<style scoped>
template{
  height:100%;
  width:100%;
}
.home_container{
  width:100%;
  height:60vh;
  background: url("../assets/home.png") #1081DE no-repeat right bottom;
  background-size: 60vw;
}
.info_container{}
.big_info{
  color:white;
  font-weight: bolder;
  font-size: 3rem;
  font-family: 幼圆;
  position: relative;
  left: 8vw;
  top: 20vh;
  width: 80vw;
}
.small_info{
  color: white;
  font-weight: bolder;
  font-size: large;
  font-family: 幼圆;
  position: relative;
  left: 8vw;
  top: 25vh;
  width: 80vw;
}
.btn{
  position: relative;
  left:8vw;
  top: 30vh;
}
.intro_container{
  height: 90vh;
  background: url("../assets/home_back.png");
}
.employ_container{
  height: 50vh;
}
.char1_card{
  height: 11vw;
  width: 17vw;
  border-radius: 10px;;
  background: url("../assets/nh-two.png") no-repeat;
  position: relative;
  top: 10vh;
  left: 20vw;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.char2_card{
  height: 11vw;
  width: 17vw;
  border-radius: 10px;;
  background: url("../assets/nh-one.png") no-repeat;
  position: relative;
  top: 4vh;
  left: 20vw;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.white_card{
  background: white;
  border-radius: 10px;
  width: 60vw;
  height: 11vw;
  position: relative;
  top:-11vh;
  left: 21vw;
  box-shadow:2px 2px 10px lightgray;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
}
.check_item{
  font-size: small;
  font-family: 幼圆;
  margin-top: 5px;
}
.join_container{
  height: 80vh;
  background: url("../assets/userBoxBg.jpg") center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.contact_container{
  height: 30vh;
  background-color: #333333;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.advantage_container{
  display: flex;
  flex-direction: column;
  margin-left: 10vw;
  justify-content: center;

}
.advantage_icon{
  height: 20vh;

}
.advantage_info{
  font-family: 幼圆;
  text-align: center;
  color: white;
  margin-top: 10px;
}
.contact_item{
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  width: 20vw;
  text-align: left;
}
.el-divider{
  height: 20vh
}
</style>