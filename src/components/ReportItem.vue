<template>
  <el-card :body-style="{padding: '0px'}" class="report_card">
    <el-row style="align-items: center" justify="space-between">
      <el-col :span="0.5" >
      <img src="../assets/functional_test.png"  alt=""/>
      </el-col>
      <el-col :span="6" style="width: 650px;">
        <div class="report_container_1">
          <div class="report_name">报告名称：{{report.reportName}}</div>
          <div class="report_id">报告ID：{{report.reportId}}</div>
        </div>
      </el-col>
      <el-col :span="6" style="">综合评分：
      <el-rate disabled v-model="totalScore"></el-rate></el-col>
      <el-col :span="4">众包工人ID:{{report.workerId}}</el-col>
      <el-col :span="4">相似度:{{report.similarity}}</el-col>
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: "ReportItem",
  props: ["report"],
  data(){
    return{
      totalScore:this.report.totalScore
    }
  }

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
  padding-left: 20px;
}
.report_container{
  display: flex;
  flex-direction: row;
  width: 920px;

}
.report_container_1{
  display: flex;
  flex-direction: column;
  /*margin-top: 10px;*/
  /*margin-left: 20px;*/

}
.report_name{
  font-size: large;
  font-weight: bold;
  font-family: 幼圆;
}
.report_id{
  margin-top: 10px;
}
</style>