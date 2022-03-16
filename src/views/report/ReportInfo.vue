<template>
  <el-divider></el-divider>
  <el-breadcrumb separator="/"  class="breadcrumb">
    <el-breadcrumb-item :to="{path: '/'}">个人中心</el-breadcrumb-item>
    <el-breadcrumb-item>测试报告详情</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="container">
    <el-card class="box_card">
      <template #header>
        <div style="display: flex;flex-direction: column">
          <div><span style="font-weight: bolder">测试报告</span></div>
          <div style="font-size: small;color:#9A9A9A" v-if="workerId !== -1">测试工人ID: {{this.workerId}}</div>
        </div>
      </template>
      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷情况详情 </div>
        </div>
        <div style="margin-top: 10px"> <span style="font-weight: bold">{{taskReport.defectExplain}}</span></div>
      </div>
      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷复现步骤 </div>
        </div>
        <div style="margin-top: 10px"> <span style="font-weight: bold">{{taskReport.defectReproduction}}</span></div>
      </div>

      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">测试设备信息</div>
        </div>
        <div style="margin-top: 10px"> <span style="font-weight: bold">{{taskReport.testEquipmentInfo}}</span></div>
      </div>

      <div class="file_information" >
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <folder-checked />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷应用截图</div>
        </div>
          <div style="display:flex;flex-direction: row">
            <div v-for="item in taskReport.defectPictureList"
                 v-bind:key="item.fileName" >
              <img :src="getPicReview(item.fileURL)"  alt="" style="width: 50px"/>
            </div>
          </div>
      </div>
      <el-divider ><el-icon><star-filled /></el-icon></el-divider>
    </el-card>
  </div>
</template>

<script>
import {FolderChecked} from "@element-plus/icons-vue"
import oss from "@/utils/oss"
import {Edit} from "@element-plus/icons-vue"
import {StarFilled} from "@element-plus/icons-vue"
import {employeeGetReportInfo} from "@/api/report";
import {employerGetReportInfo} from "@/api/report";
export default {
  name: "ReportInfo",
  data() {
    return {
      taskReport: {
        defectExplain:'',
		defectReproduction:'',
		testEquipmentInfo:'',
        defectPictureList:[]
      },
      isAble: !this.taskState,
      reportId: this.$route.params.reportId,
      workerId:-1
    }
  },
  components: {
    FolderChecked,
    Edit,
    StarFilled,
    // ReportItem
  },
  methods: {
    getPicReview(fileUrl){
      const reviewUrl = oss.ossGetReviewUrl(fileUrl.substr(49))
      return reviewUrl
    }
  },
  mounted(){
    if(window.localStorage.getItem("role") === '1') {
      employeeGetReportInfo({
        taskId: this.$route.params.taskId,
        reportId: this.reportId
      })
          .then(res => {
            if (res.response.code%100 === 0) {
              this.taskReport = res.taskReport
            }
          })
    }
    else {
      if(window.localStorage.getItem("role") === '0' || window.localStorage.getItem("role") === '2') {
        employerGetReportInfo({
          taskId:this.$route.params.taskId,
          reportId:this.reportId
        })
          .then(res => {
            if(res.response.code%100 === 0)
            {
              this.taskReport = res.taskReport
              this.workerId = res.workerId
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