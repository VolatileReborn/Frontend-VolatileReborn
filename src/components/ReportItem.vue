<template>
  <el-card :body-style="{padding: '0px'}" class="report_card">
    <el-row>
      <img src="../assets/functional_test.png">
      
      <div style="padding: 14px" class="report_container">
        <div class="report_container_1">
          <div class="report_name">{{report.reportName}}</div>
          <div class="report_id">{{report.reportId}}</div>
        </div>
        <div class="report_container_2">
          <el-row class="report_score">
            <el-col :span="30">{{report.score}}</el-col>
          </el-row>
          <div>
            <el-row class="report_info" justify="end" >
              <el-col :span="8"  class="report_info_item">众包工人ID： <span style="font-weight: bold;color:#409efc ">{{report.workerId}}</span> </el-col> 
             <!-- <el-col :span="10"  class="task_info_item">发布于 {{parseTime(task.taskStartTime,"{y}-{m}-{d}")}}</el-col> -->
           </el-row>
          </div>
        </div>
      </div>
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: "ReportItem",
  props: ["report"],

}
</script>

<style scoped>
.report_card{
  height: 14vh;
  width: 80vw;
  margin-left: 10%;
  display: flex;
  align-items: center;
  background-color: white;
  opacity: 1;
}
img{
  height: 13vh;
  width: 13vh;
  margin-left: 20px;
}
.report_container{
  display: flex;
  flex-direction: row;
  width: 920px;

}
.report_container_1{
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 20px;

}
.report_name{
  font-size: larger;
  font-weight: bold;
  font-family: 幼圆;
  margin-top: -10px;
}
.report_name{
  font-size: larger;

  margin-top: 15px;
}

.report_container_2{
  display: flex;
  flex-direction: row;
  position:absolute;
  right: 0;
  height: 100%;
  width: 400px;
  margin-top: -15px;

}

.report_info{
  position: absolute;
  bottom: 0;
  width: 400px;
}
.report_info_item{
  text-align: center;
}
</style>