<template>
  <el-divider></el-divider>
  <el-breadcrumb separator="/"  class="breadcrumb">
    <el-breadcrumb-item :to="{path: '/TaskSquare'}">任务广场</el-breadcrumb-item>
    <el-breadcrumb-item>任务详情</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="container">
  <el-card class="box_card">
    <template #header>
      <div class="card_header">
        <div class="header_left">
          <span style="font-size: larger">{{task.taskName}}</span>
          <div class="header_tags">
            <el-tag class="header_tag" type="warning">进行中</el-tag>
            <el-tag v-if="task.taskType === 0" style="margin-left: 10px">功能测试</el-tag>
            <el-tag v-if="task.taskType === 1" style="margin-left: 10px" type="success">性能测试</el-tag>
          </div>
        </div>
        <div class="header_right">
          <div style="font-size: small">紧急程度：<el-rate v-model="task.taskUrgency"
                   show-text
                   :texts="['非常宽松','宽松','一般紧急','紧急','非常紧急']"
                   :colors="['#67c23a','#FF9900','#ff0000']"
                    disabled/>
          </div>
          <div style="font-size: small">任务难度：<el-rate v-model="task.taskDifficulty"
                                                        show-text
                                                        :texts="['轻松','容易','一般','较难','困难']"
                                                        :colors="['#67c23a','#FF9900','#ff0000']"
                                                        disabled/>
          </div>
        </div>
      </div>
    </template>
    <div class="information">
      <div>发布日期 ： {{parseTime(task.taskStartTime)}}</div>
      <div style="margin-top: 5px">结束日期 ： {{ parseTime(task.taskEndTime)}}</div>
      <div style="margin-top: 5px">参与人员 ： 剩余 {{task.workerNumLeft}}  人  |  总需  {{task.workerNumTotal}} 人</div>
    </div>
    <div class="need_information">
      <div style="display: flex;flex-direction: row;margin-top:20px">
      <el-icon color="#409efc" :size="30">
        <edit />
      </el-icon>
        <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">需求描述</div>
      </div>
      <div style="margin-top: 10px">任务简介 ： {{task.taskIntroduction}}</div>
      <div style="margin-top: 10px;display: flex;flex-direction: row">
        <span style="padding-top: 10px">测试设备需求：</span>
        <div style="flex-direction: column;justify-content: center" v-if="task.android === true">
        <el-image class="device_img"  :src="require('../../assets/Android.png')"></el-image>
          <div>Android</div>
        </div>
        <div style="flex-direction: column;justify-content: center" v-if="task.ios === true">
          <el-image class="device_img"  :src="require('../../assets/iOS.png')"></el-image>
          <div style="padding-left: 18px">iOS</div>
        </div>
        <div style="flex-direction: column;justify-content: center" v-if="task.linux === true">
          <el-image class="device_img"  :src="require('../../assets/Linux.png')"></el-image>
          <div style="padding-left: 10px">Linux</div>
        </div>
        <div style="flex-direction: column;justify-content: center" v-if="task.windows === true">
          <el-image class="device_img" style="padding-left: 25px"  :src="require('../../assets/Windows.png')"></el-image>
          <div style="padding-left: 10px">Windows</div>
        </div>
        <div style="flex-direction: column;justify-content: center" v-if="task.harmonyos === true">
          <el-image class="device_img"   :src="require('../../assets/Harmony.jpg')"></el-image>
          <div style="padding-left: 25px">鸿蒙</div>
        </div>
      </div>
    </div>
    <div v-if="this.role === '1'">
    <el-button v-if="isAble" type="danger" round class="check_btn" size="large" @click="enroll()" >我要报名</el-button>
    <el-button v-else type="info" round class="check_btn" size="large" @click="showEnrollError()" plain>我要报名</el-button>
    </div>
  </el-card>
  </div>
</template>

<script >
import {Edit} from "@element-plus/icons-vue"
import {ElMessage} from "element-plus";
import {acceptTask} from "@/api/task";
import {employeeTaskDetail} from "@/api/square";
import {visitorTaskDetail} from "@/api/square";
import {parseTime} from "@/utils/utils";

// const UrgencyIcons = [Clock,Clock,Clock]

export default {
  name: "TaskInfoFromSquare",
  data() {
    return {
      taskId: parseInt(this.$route.params.taskId),
      task: {
        // android: 1,
        // ios: 1,
        // linux: 1,
        // windows: 1 ,
        // harmonyos: 1,
        // taskDifficulty: 1,
        // taskEndTime: 1651161600000,
        // taskId: 5,
        // taskIntroduction: "task 5 introduction",
        // taskName: "Task 5",
        // taskStartTime: 1642569600000,
        // taskState: 0,
        // taskType: 1,
        // taskUrgency: 4,
        // workerNumLeft: 0,
        // workerNumTotal: 3,
      },
      role:window.localStorage.getItem("role"),
      isSelected: 0,
      isAble: !this.isSelected,
      // UrgencyIcons
    }
  },
  mounted() {
    if(this.role==='1')
    {
      employeeTaskDetail({taskId:this.taskId})
      .then(res => {
        if(res.response.code%100 === 0)
        {
          this.task = res.task
          this.isSelected = res.isSelected
          this.isAble= this.task.taskState === 0 && this.isSelected === 0
        }
        else {
          ElMessage.error(res.response.message)
        }
      })
    }
    else {
      visitorTaskDetail({taskId:this.taskId})
      .then(res => {
        if(res.response.code%100 === 0)
        {
          this.task = res.task
        }
        else {
          ElMessage.error(res.response.message)
        }
      })
    }
  },
  components: {
    Edit,
  },
  methods: {
    parseTime,
    enroll(){
      acceptTask({taskId:this.taskId})
      .then(res => {
        console.log(res)
        if(res.response.code%100 === 0){
          ElMessage({
            message:'报名成功！',
            type:'success',
            duration:1000,
            onClose:()=> {
              this.$router.push("/taskInfoFromUser/"+this.taskId)
            }
          })
        }
        else {
            ElMessage.error(res.response.message);
        }
      })
    },
    showEnrollError(){
      if(this.task.taskState === 1){
        ElMessage.error('非常抱歉，报名已经结束，看看其他项目吧');
      }
      else if(this.isSelected === 1)
      {
        ElMessage.error('你已经报名了该项目哦，请前往个人中心查看')
      }
    }
  }
}
</script>

<style scoped>
.breadcrumb{
  margin-left: 20px;
  font-family: 幼圆;
  font-size: medium;
  margin-top: -10px;
}
.box_card{
  width: 90%;
  margin-top: 10px;
  margin-left: 5%;
  height: 450px;
}
.card_header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.header_left{
  margin-left: 5px;
  display: flex;
  flex-direction: column;
}
.header_right{
  display: flex;
  flex-direction: column;
}
.header_tags{
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}
.information{
  display: flex;
  flex-direction: column;
}
.check_btn{
  position: absolute;
  right: 90px;
  bottom: 65px;
}
.device_img{
  height:32px;
  padding-left: 16px;
}
</style>