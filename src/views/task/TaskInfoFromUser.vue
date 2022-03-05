<template>
  <el-divider></el-divider>
  <el-breadcrumb separator="/"  class="breadcrumb">
    <el-breadcrumb-item :to="{path: '/TaskSquare'}">个人中心</el-breadcrumb-item>
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
        <div>发布日期 ： {{task.taskStartTime}}</div>
        <div style="margin-top: 5px">结束日期 ： {{task.taskEndTime}}</div>
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
          <div>
          <a :href="exeUrl" :download="exeName">
            <el-button type="text" @click="downloadExe">一、点击下载待测应用可执行文件</el-button>
          </a>
            <a :href="docUrl" :download="docName">
          <el-button type="text" @click="downloadDoc">二、点击下载测试需求描述文件</el-button>
            </a>
          </div>
      </div>
      <div ><el-button v-if="role === '1'" type="danger" style="margin-right:500px">提交报告</el-button></div>
      <el-divider ><el-icon><star-filled /></el-icon></el-divider>
      <div class="report_container" v-if="role === '0' || role === '2'">
        <el-row>
          <el-col :span="15"><span style="font-weight: bolder">报告展示</span></el-col>
          <el-col :span="5">

          </el-col>
        </el-row>
        <el-table :data="task.reportList" height="250" style="width:1500px;margin-top: 10px" stripe border highlight-current-row @current-change="goReport">
          <el-table-column prop="reportId" label="报告ID" width="180" />
          <el-table-column prop="reportName" label="报告名称" width="180" />
          <el-table-column prop="defectExplain" label="缺陷说明" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import {FolderChecked} from "@element-plus/icons-vue"
import {ElMessage} from "element-plus";
import {Edit} from "@element-plus/icons-vue"
import {StarFilled} from "@element-plus/icons-vue"
import {employerBrowserTaskDetail} from "@/api/task";
import {browserReports} from "@/api/report";
import oss from "@/utils/oss"

const goReport = (val) =>{
  console.log("reportId="+val.reportId)

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
        taskStartTime: '',
        taskEndTime: '',
        taskState: true,
        taskIntroduction: '',
        requirementDescriptionFileList:[],
        executableFileList:[],
        is_selected: false,
        //todo:reportList数据获取
        reportList:[
          // {
          //   reportId:0,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          // },
          // {
          //   reportId:1,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          // },
          // {
          //   reportId:2,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          // },
          // {
          //   reportId:3,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          // },
          // {
          //   reportId:4,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          // },
          // {
          //   reportId:5,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          // },
        ]
      },
      isAble: !this.taskState,
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
    enroll(){
      this.$router.push("/taskEnrollSucceed")
    },
    showEnrollError(){
      ElMessage.error('非常抱歉，报名已经结束，看看其他项目吧');
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
    goReport
  },
  mounted() {
    if(this.role === '0')
    {
      employerBrowserTaskDetail({token:window.localStorage.getItem("token"),taskId:this.taskId})
      .then(res => {
        if(res.code === 1)
        {
          console.log(res.msg)
          this.task.workerNumTotal = res.data.workerNumTotal
          this.task.taskState = res.data.taskState
          this.task.workerNumLeft = res.data.workerNumLeft
          this.task.requirementDescriptionFileList = res.data.requirementDescriptionFileList
          this.task.executableFileList = res.data.executableFileList
          this.task.taskName = res.data.taskName
          this.task.taskIntroduction = res.data.taskIntroduction
          this.task.taskStartTime = res.data.beginTime
          this.task.taskEndTime = res.data.endTime
        }
      })

      if(this.role === '0' || this.role === '2' )
      {
        browserReports({token:window.localStorage.getItem("token"),taskId:this.taskId})
        .then(res => {
          if(res.code === 1)
          {
            this.task.reportList = res.data.reportList
          }
        })
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