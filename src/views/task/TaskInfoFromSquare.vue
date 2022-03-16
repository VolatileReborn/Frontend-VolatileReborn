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
        <span style="font-size: larger">{{task.taskName}}</span>
        <div class="header_tags">
         <el-tag class="header_tag" type="warning">竞标中</el-tag>
          <el-tag v-if="task.taskType === 0" style="margin-left: 10px">功能测试</el-tag>
          <el-tag v-if="task.taskType === 1" style="margin-left: 10px" type="success">性能测试</el-tag>
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
    </div>
    <div v-if="this.role === '1'">
    <el-button v-if="isAble" type="danger" round class="check_btn" size="large" @click="enroll()" >我要报名</el-button>
    <el-button v-else type="info" round class="check_btn" size="large" @click="showEnrollError()" plain>我要报名</el-button>
    </div>
  </el-card>
  </div>
</template>

<script>
import {Edit} from "@element-plus/icons-vue"
import {ElMessage} from "element-plus";
import {acceptTask} from "@/api/task";
import {employeeTaskDetail} from "@/api/square";
import {employerTaskDetail} from "@/api/square";
import {parseTime} from "@/utils/utils";

export default {
  name: "TaskInfoFromSquare",
  data() {
    return {
      taskId: parseInt(this.$route.params.taskId),
      task: {
        // taskId: 0,
        // taskName: 'test_task',
        // taskType: 0,
        // workerNumTotal: 10,
        // workerNumLeft: 5,
        // taskStartTime: '2022-3-1',
        // taskEndTime: '2022-5-3',
        // taskState: true,
        // taskIntroduction: '这是一个测试任务',
      },
      role:window.localStorage.getItem("role"),
      isSelected: false,
      isAble: true
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
          this.isAble= this.task.taskState === 0 && this.role === '1'
        }
      })
    }
    else if(this.role === '0')
    {
      employerTaskDetail({taskId:this.taskId})
      .then(res => {
        if(res.response.code%100 === 0)
        {
          console.log(res.response.message)
          this.task = res.task
        }
        else {
          console.log(res.response.message)
        }
      })
    }
  },
  components: {
    Edit
  },
  methods: {
    parseTime,
    enroll(){
      acceptTask({taskId:this.taskId})
      .then(res => {
        console.log(res)
        if(res.status === 500){
          this.$router.push("/taskEnrollSucceed")
          // console.log(res.response.message)
          // console.log(res.data)

        }
        else {
          if(res.response.code === 2)
          {
            ElMessage.error(res.response.message);
            console.log(res.response.message)
          }

        }
      })
    },
    showEnrollError(){
      ElMessage.error('非常抱歉，报名已经结束，看看其他项目吧');
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
  margin-left: 5px;
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
</style>