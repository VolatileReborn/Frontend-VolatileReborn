<template>
<el-container>
  <el-aside width="50%">
    <report-info-item v-bind:task-report="parentReport" style="width:90%;height: 83vh;margin-top: 20px;"></report-info-item>
  </el-aside>
  <el-main>
    <report-info-item v-bind:task-report="report" style="width:90%;height: 82vh;margin-top: 0"></report-info-item>
  </el-main>
</el-container>
</template>

<script>
import ReportInfoItem from '@/components/ReportInfoItem'
import {employeeGetReportInfo} from "@/api/report";
import {employeeGetCooperationInfo} from '@/api/report'
import {employerGetReportInfo} from "@/api/report";
import {employerGetCooperationInfo} from "@/api/report";
import {ElMessage} from 'element-plus'
export default {
  name: "ReportInfoCooperation",
  components:{
    ReportInfoItem
  },
  data(){
    return {
      parentReport:{},
      report:{},
      taskId:this.$route.query.taskId,
      reportId:this.$route.query.reportId, // 父报告id
      cooperationReportId:0,
    }
  },
  mounted() {
    // 获得一级报告
    if(localStorage.getItem("role") === '1') {
      employeeGetReportInfo({taskId: this.taskId, reportId: this.reportId})
          .then(res => {
            if (res.response.code % 100 === 0) {
              this.parentReport.defectPictureList = res.defectPictureList
              this.parentReport.reportName = res.taskReport
              this.parentReport.reportName = res.reportName
              this.parentReport.defectExplain = res.defectExplain
              this.parentReport.defectReproduction = res.defectReproduction
              this.parentReport.testEquipmentInfo = res.testEquipmentInfo
              this.parentReport.workerId = res.workerId
              this.parentReport.totalScore = res.totalScore
              this.cooperationReportId = this.$route.query.cooperationReportId === undefined ? res.cooperationReportId : this.$route.query.cooperationReportId
              employeeGetCooperationInfo({cooperationReportId: this.cooperationReportId})
                  .then(res => {
                    if (res.response.code % 100 === 0) {
                      this.report.defectPictureList = res.defectPictureList
                      this.report.reportName = res.reportName
                      this.report.workerId = res.workerId
                      this.report.defectExplain = res.defectExplain
                      this.report.defectReproduction = res.defectReproduction
                      this.report.testEquipmentInfo = res.testEquipmentInfo
                      this.report.totalScore = -1
                    }
                    else
                    {
                      ElMessage.error(res.response.message)
                    }
                  })
            } else {
              ElMessage.error(res.response.message)
            }
          })
    }
    else
    {
      employerGetReportInfo({taskId:this.$route.query.taskId,reportId:this.$route.query.reportId})
      .then(res => {
        if(res.response.code%100 === 0)
        {
          this.parentReport.defectPictureList = res.defectPictureList
          this.parentReport.reportName = res.taskReport
          this.parentReport.reportName = res.reportName
          this.parentReport.defectExplain = res.defectExplain
          this.parentReport.defectReproduction = res.defectReproduction
          this.parentReport.testEquipmentInfo = res.testEquipmentInfo
          this.parentReport.workerId = res.workerId
          this.parentReport.totalScore = res.totalScore
          this.cooperationReportId = this.$route.query.cooperationReportId
          employerGetCooperationInfo({cooperationReportId:this.cooperationReportId})
          .then(res => {
            if(res.response.code %100 === 0)
            {
              this.report.defectPictureList = res.defectPictureList
              this.report.reportName = res.reportName
              this.report.workerId = res.workerId
              this.report.defectExplain = res.defectExplain
              this.report.defectReproduction = res.defectReproduction
              this.report.testEquipmentInfo = res.testEquipmentInfo
              this.report.totalScore = -1
            }
            else {
              ElMessage.error(res.response.message)
            }
          })

        }
        else {
          ElMessage.error(res.response.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>