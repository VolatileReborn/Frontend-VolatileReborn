<template>
  <el-divider></el-divider>
  <el-breadcrumb separator="/"  class="breadcrumb">
    <el-breadcrumb-item @click="go_route"><span style="font-weight: bold">任务详情</span></el-breadcrumb-item>
    <el-breadcrumb-item>测试报告详情</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="container" v-infinite-scroll="load" style="overflow: auto;">
    <el-card class="box_card" >
      <template #header>
        <div style="display: flex;flex-direction: column">
          <div><span style="font-weight: bolder;font-size: xx-large">{{ this.taskReport.reportName }}</span></div>
          <div style="font-size: small;color:#9A9A9A" v-if="workerId !== -1">测试工人ID: {{this.workerId}}</div>
        </div>
      </template>
      <div class="need_information">
        <div style="display: flex;flex-direction: row">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷情况详情 </div>
        </div>
        <div style="margin-top: 10px"> <span >{{taskReport.defectExplain}}</span></div>
      </div>
      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷复现步骤 </div>
        </div>
        <div style="margin-top: 10px"> <span >{{taskReport.defectReproduction}}</span></div>
      </div>

      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">测试设备信息</div>
        </div>
        <div style="margin-top: 10px"> <span >{{taskReport.testEquipmentInfo}}</span></div>
      </div>

      <div class="file_information" >
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <folder-checked />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷应用截图</div>
        </div>
          <div  style="display:flex;flex-direction: row;margin-top: 5px">
            <div v-for="item in taskReport.defectPictureList"
                 v-bind:key="item.fileName" >
              <el-image :src="item.fileURL"  alt="" style="height: 15vh;margin-left: 5px" :preview-src-list="srcList" :initial-index="0" lazy fit="scale-down"/>
            </div>
          </div>
      </div>
      <el-divider ><el-icon><star-filled /></el-icon></el-divider>
    </el-card>
  </div>
</template>

<script>
import {FolderChecked} from "@element-plus/icons-vue"
// import oss from "@/utils/oss"
import {Edit} from "@element-plus/icons-vue"
import {StarFilled} from "@element-plus/icons-vue"
import {employeeGetReportInfo} from "@/api/report";
import {employerGetReportInfo} from "@/api/report";
import {ref} from 'vue'
import {ElMessage} from "element-plus";
// import {debounce} from "@/utils/utils";
//
// var reviewRes = {}
// const getPicReview = debounce(function(fileUrl){
//   oss.ossGetReviewUrl(fileUrl.substr(49))
//       .then(res => {
//         reviewRes = res
//       })
//   console.log(reviewRes.reviewURL)
//   const reviewUrl = reviewRes.reviewURL
//   return reviewUrl
// },3000)
const count = ref(0);
const load = () => {
  count.value += 2
}
export default {
  name: "ReportInfo",
  data() {
    return {
      taskReport: {
        reportName:'',
        defectExplain:'',
		defectReproduction:'',
		testEquipmentInfo:'',
        defectPictureList:[]
      },
      isAble: !this.taskState,
      reportId: this.$route.params.reportId,
      workerId:-1,
      // reviewRes:{},
      srcList:[]
    }
  },
  components: {
    FolderChecked,
    Edit,
    StarFilled,
    // ReportItem
  },
  methods: {
    // getPicReview
    load,
    go_route(){
      this.$router.push("/taskInfoFromUser/"+this.$route.params.taskId)
    }
  },
  mounted(){
    console.log(this.$route.params.taskId)
    console.log(this.$route.params.reportId)
    if(window.localStorage.getItem("role") === '1') {
      employeeGetReportInfo({
        taskId: this.$route.params.taskId,
        reportId: this.reportId
      })
          .then(res => {
            if (res.response.code %100 === 0) {
              console.log(res)
              this.taskReport.defectPictureList = res.defectPictureList
              this.taskReport.defectPictureList.forEach(item => {
                this.srcList.push(item.fileURL)
              })
              console.log(this.srcList)
              this.taskReport.reportName = res.taskReport
              this.taskReport.defectExplain = res.defectExplain
              this.taskReport.defectReproduction = res.defectReproduction
              this.taskReport.testEquipmentInfo = res.testEquipmentInfo
            }
            else{
              ElMessage.error(res.response.message)
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
              this.taskReport.defectPictureList = res.defectPictureList
              this.taskReport.defectPictureList.forEach(item => {
                this.srcList.push(item.fileURL)
              })
              console.log(this.srcList)
              this.taskReport.defectExplain = res.defectExplain
              this.taskReport.defectReproduction = res.defectReproduction
              this.taskReport.testEquipmentInfo = res.testEquipmentInfo
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
.container{
  height: 80vh;
  padding: 0;
  margin:0;
  list-style: none;
  /*display: flex;*/
  /*justify-content: center;*/
}
</style>