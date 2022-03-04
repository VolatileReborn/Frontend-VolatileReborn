<template>
  <el-divider></el-divider>
  <el-breadcrumb separator="/"  class="breadcrumb">
    <el-breadcrumb-item :to="{path: '/TaskSquare'}">个人中心</el-breadcrumb-item>
    <el-breadcrumb-item>测试报告详情</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="container">
    <el-card class="box_card">
      <template #header>
        <div class="card_header">
          <span style="font-size: larger">{{task.taskName}}</span>
          
        </div>
      </template>
      
      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷情况详情 </div>
        </div>
        <div style="margin-top: 10px"> <span style="font-weight: bold">{{task.taskIntroduction}}</span></div>
      </div>

      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷复现步骤 </div>
        </div>
        <div style="margin-top: 10px"> <span style="font-weight: bold">{{task.taskIntroduction}}</span></div>
      </div>

      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">需求描述</div>
        </div>
        <div style="margin-top: 10px"> <span style="font-weight: bold">{{task.taskIntroduction}}</span></div>
      </div>

      <div class="file_information" >
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <folder-checked />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">附件下载</div>
        </div>
          <div>
          <el-button type="text" @click="downloadExe">点击下载出现缺陷的应用截图</el-button>
          
          </div>
      </div>
      <el-divider ><el-icon><star-filled /></el-icon></el-divider>
      
    </el-card>
  </div>
</template>

<script>
import {FolderChecked} from "@element-plus/icons-vue"
import {ElMessage} from "element-plus";
import {Edit} from "@element-plus/icons-vue"
import {StarFilled} from "@element-plus/icons-vue"
// import ReportItem from "@/components/ReportItem"

const goReport = (val) =>{
  console.log("reportId="+val.reportId)

}

export default {
  name: "TaskInfoFromUser",
  data() {
    return {
      taskId: this.$route.params.taskId,
      task: {
        taskId: 0,
        taskName: 'test_task',
        taskType: 0,
        workerNumTotal: 10,
        workerNumLeft: 5,
        taskStartTime: '2022-3-1',
        taskEndTime: '2022-5-3',
        taskState: false,
        taskIntroduction: '这是一个测试任务',
        is_selected: false,
        reportList:[
          {
            reportId:0,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          },
          {
            reportId:1,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          },
          {
            reportId:2,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          },
          {
            reportId:3,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          },
          {
            reportId:4,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          },
          {
            reportId:5,reportName:'test_report1',defectExplain:'测试报告缺陷说明'
          },
        ]
      },
      isAble: !this.taskState,

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

    },
    downloadDoc(){

    },
    goReport
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