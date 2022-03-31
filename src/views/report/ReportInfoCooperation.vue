<template>
<el-container>
  <el-aside width="50%">
    <report-info-item v-bind:task-report="parentReport" style="width:90%;height: 83vh;margin-top: 20px;"></report-info-item>
  </el-aside>
  <el-main>
    <report-info-item v-bind:task-report="report" style="width:90%;height: 83vh;margin-top: 20px;"></report-info-item>
  </el-main>
</el-container>
</template>

<script>
import ReportInfoItem from '@/components/ReportInfoItem'
import {employeeGetReportInfo} from "@/api/report";
import {employeeGetCooperationInfo} from '@/api/report'
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
    }
  },
  mounted() {
    // 获得一级报告
    employeeGetReportInfo({taskId:this.taskId,reportId:this.reportId})
        .then(res => {
          if(res.response.code%100 === 0)
          {
            this.parentReport.defectPictureList = res.defectPictureList
            this.parentReport.reportName = res.taskReport
            this.parentReport.defectExplain = res.defectExplain
            this.parentReport.defectReproduction = res.defectReproduction
            this.parentReport.testEquipmentInfo = res.testEquipmentInfo
            this.parentReport.workerId = res.workerId
            this.parentReport.totalScore = res.totalScore
            this.parentReport.sonReportId = res.sonReportId
            employeeGetCooperationInfo({cooperationReportId:this.parentReport.sonReportId})
                .then(res => {
                  if(res.response.code%100 === 0)
                  {
                    this.parentReport.defectPictureList = res.defectPictureList
                    this.parentReport.reportName = res.taskReport
                    this.parentReport.defectExplain = res.defectExplain
                    this.parentReport.defectReproduction = res.defectReproduction
                    this.parentReport.testEquipmentInfo = res.testEquipmentInfo
                  }
                })
          }else {
            ElMessage.error(res.response.message)
          }
        })

  }
}
</script>

<style scoped>

</style>