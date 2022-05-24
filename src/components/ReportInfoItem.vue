<template>
  <el-card :body-style="{padding: '0px'}" class="reportInfo_card">
    <template #header>
        <div style="display: flex;flex-direction: column">
          <div><span style="font-weight: bolder;font-size: x-large;justify-content: center">{{ taskReport.reportName }}</span></div>
          <div style="font-size: medium;color:grey;text-align:center" >测试工人ID: {{taskReport.workerId}}</div>
          <div style="font-size: medium;color:grey;text-align:center" v-if="taskReport.totalScore !== -1">综合评分: {{taskReport.totalScore}}</div>
        </div>
    </template>
    <el-scrollbar height="400px">  
    <div class="need_information">
        <div style="display: flex;flex-direction: row;text-align:center">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 20px;font-weight: bolder;margin-left: 5px;text-align:center">缺陷情况详情: </div>
        </div>
        <div style="margin-top: 10px;text-align:center"> <span >{{taskReport.defectExplain}}</span></div>
      </div>
      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px;text-align:center">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px;text-align:center">缺陷复现步骤: </div>
        </div>
        <div style="margin-top: 10px;text-align:center"> <span >{{taskReport.defectReproduction}}</span></div>
      </div>

      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px;text-align:center">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px;text-align:center">测试设备信息:</div>
        </div>
        <div style="margin-top: 10px;text-align:center"> <span >{{taskReport.testEquipmentInfo}}</span></div>
      </div>

      <div class="file_information" >
        <div style="display: flex;flex-direction: row;margin-top:20px;text-align:center">
          <el-icon color="#409efc" :size="30">
            <folder-checked />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px;text-align:center">缺陷应用截图:</div>
        </div>
          <div  style="display:flex;flex-direction: row;margin-top: 5px;justify-content:center">
            <div v-for="item in taskReport.defectPictureList"
                 v-bind:key="item.fileName" >
              <el-image :src="item.fileURL"  alt="" style="height: 15vh;margin-left: 5px;text-align:center" :preview-src-list="srcList" :initial-index="0" lazy fit="scale-down"/>
            </div>
          </div>
      </div>
      <el-divider v-if="taskReport.totalScore !== -1"></el-divider>
      <div class="report_container" v-if="taskReport.totalScore !== -1" >
        <el-row>
          <el-col :span="15"><span style="font-weight: bolder;margin-left: 35px">协作报告展示：</span></el-col>
          <el-col :span="5">
          </el-col>
        </el-row>
        <el-table :data="cooperationReportList"
                  height="250"
                  style="width:90%;margin-top: 10px;text-align: center;margin-left:5%"
                  stripe
                  border
                  size="large"
                  highlight-current-row
                  type-layout="auto">
          <el-table-column type="index" width="100" align="center" />
          <el-table-column prop="reportName" label="报告名称"  align="center"/>
          <el-table-column label="测试工人ID" align="center" >
            <template #default="scope">
              <div style="display: flex;align-items: center;justify-content: center">
                <el-icon><Avatar /></el-icon>
                <span style="margin-left: 10px;">{{scope.row.workerId}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button size="small" type="primary" @click="goCooperationReport(scope.row.reportId)">查看报告</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
        </el-scrollbar>
      
  </el-card>
</template>

<script>
import {Avatar} from '@element-plus/icons-vue'
import {getThisCooperationList} from "@/api/report";
import {ElMessage} from "element-plus";

export default {
  name: "ReportInfoItem",
  props: ["taskReport"],
  data(){
    return {
      srcList:[],
      cooperationReportList:[],
  }
  },
  mounted() {
    setTimeout(()=>{
      if(this.taskReport.defectPictureList.length > 0) {
        this.taskReport.defectPictureList.forEach(item => {
          this.srcList.push(item.fileURL)
        })
      }

    },2000)
    if(this.taskReport.totalScore !== -1) {
      getThisCooperationList({reportId: this.$route.query.reportId})
          .then(res => {
            if (res.response.code % 100 === 0) {
              this.cooperationReportList = res.cooperationReportList
            } else {
              ElMessage.error(res.response.message)
            }
          })
    }
  },
  methods:{
    goCooperationReport(reportId){
      this.$router.push({
        name:'ReportInfoCooperation',
        query:{
          taskId:this.$route.query.taskId,
          reportId:this.$route.query.reportId,
          cooperationReportId:reportId
        }
      }).then(() => {
        location.reload()
      })

    },
  },
  components:{
    Avatar
  }
}
</script>

<style scoped>

.reportInfo_card{
  width: 50%;
  margin-top: 10px;
  margin-left: 5%;
}

</style>