<template>
<el-container>
    <report-info-item v-bind:task-report="taskReport" style="width:90%;height: 83vh;margin-top: 20px;"></report-info-item>
</el-container>
</template>

<script>
import ReportInfoItem from "@/components/ReportInfoItem"
import {employeeGetReportInfo} from "@/api/report";
import {ElMessage} from 'element-plus'
export default {
  name: "MyReportInfo",
  components:{
    ReportInfoItem,
  },
  data(){
    return{
      taskReport:{
        defectPictureList:[],
        reportName:'',
        defectExplain:'',
        defectReproduction:'',
        testEquipmentInfo:'',
        totalScore:0,
        reportList:[]
      },
      taskId:this.$route.query.taskId,
      reportId:this.$route.query.reportId,
    }
  },
  mounted() {
    employeeGetReportInfo({taskId:this.taskId,reportId:this.reportId})
    .then(res => {
      if(res.response.code%100 === 0)
      {
        this.taskReport.defectPictureList = res.defectPictureList
        this.taskReport.reportName = res.reportName
        this.taskReport.workerId = res.workerId
        this.taskReport.defectExplain = res.defectExplain
        this.taskReport.defectReproduction = res.defectReproduction
        this.taskReport.testEquipmentInfo = res.testEquipmentInfo
        this.taskReport.totalScore = res.totalScore
      }
      else {
        ElMessage.error(res.response.message)
      }
    })

  },
  methods:{

  }
}
</script>

<style scoped>
</style>