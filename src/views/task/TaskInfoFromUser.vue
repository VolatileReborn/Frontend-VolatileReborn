<template>
  <el-divider></el-divider>
  <el-breadcrumb separator="/"  class="breadcrumb">
    <el-breadcrumb-item @click="go_route"><strong>个人中心</strong></el-breadcrumb-item>
    <el-breadcrumb-item>任务详情</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="container" v-infinite-scroll="load" style="overflow: auto">
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
        <div>发布日期 ： {{ parseTime(task.taskStartTime)}}</div>
        <div style="margin-top: 5px">结束日期 ： {{parseTime(task.taskEndTime)}}</div>
        <div style="margin-top: 5px">参与人员 ： 剩余 <span style="font-weight: bold;color:#409efc ">{{task.workerNumLeft}}</span>  人  <el-divider direction="vertical" ></el-divider>  总需  <span style="font-weight: bold;color:#409efc ">{{task.workerNumTotal}}</span> 人</div>
      </div>
      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">需求描述</div>
        </div>
        <div style="margin-top: 10px">任务简介 ： <span style="font-weight: bold">{{task.taskIntroduction}}</span></div>
      </div>
      <div class="file_information" >
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <folder-checked />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">附件下载</div>
        </div>
          <div style="display: flex;flex-direction: row">
          <a :href="exeUrl" download="待测应用可执行文件">
            <el-button type="text" @click="downloadExe">一、点击下载待测应用可执行文件</el-button>
          </a>
            <a :href="docUrl" download="测试需求描述文件" style="margin-left: 10px">
          <el-button type="text" @click="downloadDoc">二、点击下载测试需求描述文件</el-button>
            </a>
            <div v-if="this.role === '0'">
              <el-button v-if="isAble" type="danger" round style="margin-left: 600px" size="large" @click="finish()" >结束任务</el-button>
            </div>
          </div>
      </div>
      <div ><el-button v-if="role === '1'" type="danger" style="margin-right:500px" @click="goRelease">提交报告</el-button></div>
      <el-divider ><el-icon><star-filled /></el-icon></el-divider>
      <div class="report_container" v-if="role === '0' || role === '2'">
        <el-row>
          <el-col :span="15"><span style="font-weight: bolder">报告展示</span></el-col>
          <el-col :span="5">

          </el-col>
        </el-row>
        <el-table :data="task.reportList" height="250" style="width:1500px;margin-top: 10px" stripe border highlight-current-row @current-change="goReport">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="reportId" label="报告ID" width="180" />
          <el-table-column prop="workerId" label="测试工人ID" width="180" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import {FolderChecked} from "@element-plus/icons-vue"
import {Edit} from "@element-plus/icons-vue"
import {StarFilled} from "@element-plus/icons-vue"
import {employerBrowserTaskDetail} from "@/api/task";
import {browserReports} from "@/api/report";
import {browserChecked} from "@/api/usercenter";
import oss from "@/utils/oss"
import {parseTime} from "@/utils/utils";
import {ref} from "vue"
import {ElMessage} from "element-plus";
const goReport = (val) =>{
  console.log(val)
  this.$router.push({
    path:"/reportInfo",
    params:{
      taskId:this.taskId,
      reportId:val.reportId
    }
  })
}

const count = ref(0);
const load = () => {
  count.value += 2
}
export default {
  name: "TaskInfoFromUser",
  data() {
    return {
      taskId: this.$route.params.taskId,
      task: {
        taskId: this.taskId,
        taskName: '',
        taskType: 0,
        workerNumTotal: 0,
        workerNumLeft: 0,
        taskStartTime: 0,
        taskEndTime: 0,
        taskState: true,
        taskIntroduction: '',
        requirementDescriptionFileList:[],
        executableFileList:[],
        is_selected: false,
        //todo:reportList数据获取
        reportList:[
        ]
      },
      isAble: false,
      role:window.localStorage.getItem("role"),
      exeUrl:'',
      exeName:'',
      docUrl:'',
      docName:''
    }
  },
  components: {
    FolderChecked,
    Edit,
    StarFilled,
    // ReportItem
  },
  methods: {
    load,
    parseTime,
    go_route(){
      if(this.role === '0')
      {
        this.$router.push("/userCenterofEmployer")
      }
      if(this.role === '1')
      {
        this.$router.push("/userCenterofEmployee")
      }
      if(this.role === '2')
      {
        this.$router.push("userCenterOfManager")
      }
    },
    downloadExe(){
      oss.ossGetDownloadUrl(this.task.executableFileList[0].fileURL.substr(49))
      .then(res => {
        this.exeUrl = res.downloadURL
        this.exeName = this.task.executableFileList[0].fileName
        console.log(this.exeUrl)
        console.log(this.exeName)
      })
    },
    downloadDoc(){
      oss.ossGetDownloadUrl(this.task.requirementDescriptionFileList[0].fileURL.substr(49))
          .then(res => {
            this.docUrl = res.downloadURL
            this.docName = this.task.requirementDescriptionFileList[0].fileName
            console.log(this.docUrl)
            console.log(this.docName)
          })
    },
    goReport,
    goRelease(){
      this.$router.push("/reportRelease/"+this.taskId)
    },
    finish(){
      browserChecked({taskId:this.taskId})
      .then(res => {
        console.log(res)
        if(res.status === 0){
          console.log(res.response.message)
          this.$router.push("/taskFinished")


        }
        else {
          if(res.response.code === 2)
          {
            ElMessage.error(res.response.message);
            console.log(res.response.message)
          }

        }
      })
    }
  },
  mounted() {
      employerBrowserTaskDetail({taskId:this.taskId})
      .then(res => {
        if(res.response.code%100 === 0)
        {
          console.log(res.response.message)
          this.task.workerNumTotal = res.workerNumTotal
          this.task.taskState = res.taskState
          this.task.workerNumLeft = res.workerNumLeft
          this.task.requirementDescriptionFileList = res.requirementDescriptionFileList
          this.task.executableFileList = res.executableFileList
          this.task.taskName = res.taskName
          this.task.taskIntroduction = res.taskIntroduction
          this.task.taskStartTime = res.beginTime
          this.task.taskEndTime = res.endTime
        }
      })
      if(this.role === '0' || this.role === '2')
      {
        browserReports({taskId:this.taskId})
        .then(res => {
          if(res.response.code % 100 === 0)
          {
            this.task.reportList = res.reportList
            this.isAble= this.task.taskState === 0 && this.role === '0'
          }
        })
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
.container{
  height: 80vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.box_card{
  width: 90%;
  margin-top: 10px;
  margin-left: 5%;
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
</style>