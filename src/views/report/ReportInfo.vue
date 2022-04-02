<template>
  <el-container style="height: 90vh">
    <el-aside width="70%" style="font-size: larger">
      <report-info-item v-bind:task-report="parentReport" style="width: 90%;height: 85vh"></report-info-item>
    </el-aside>
    <el-main >
    <div class="container">
        <div v-if="isScored === 0">
            <el-card style="height: 82vh">
            <template #header>
            <div class="card_header">
                <span style="font-weight: bolder">报告评分</span>
            </div>
            </template>
            <div style="margin-left: -50px">
            <el-form ref="basicInfo" :model="score_form" label-width="120px" label-position="right" :rules="rules" class="basicInfo" >
                <el-form-item label="评分" prop="score">
                    <el-rate v-model="score_form.value" :texts="['很差', '较差', '一般', '良好', '非常好']" show-text />
                </el-form-item>
                <el-form-item label="评价" prop="comment">
                    <el-input v-model="score_form.comment" :rows="3" type="textarea" ></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="handleSubmit('basicInfo')">提交评价</el-button>
                    <el-button @click="cancelSubmit">取消</el-button>
                </el-form-item>

            </el-form>
            </div>
              <div v-if="role === '1'"  style="display: flex;justify-content: center">
                <el-button  v-if="isCooperated === 0" type="danger"  @click="goCooperate">去协作</el-button>
<!--                <el-button  v-if="isCooperated === 1" type="primary"  @click="goReportInfoCooperation">我的协作</el-button>-->
              </div>
             </el-card>
        </div>
        <div v-else>
            <el-card style="height: 82vh">
            <template #header>
            <div class="card_header">
                <span style="font-weight: bolder">报告评分</span>
            </div>
            </template>
            <div >
              <div>评分：
                  <el-rate v-model="show_score_form.value" disabled text-color="#ff9900" :texts="['很差', '较差', '一般', '良好', '非常好']" show-text/>
              </div>
              <div style="margin-top: 10px">评论 ： <span style="font-weight: bold">{{show_score_form.comment}}</span></div>
            </div>
              <div v-if="role === '1'" style="display: flex;justify-content: center;margin-top: 10px">
                <el-button  v-if="isCooperated === 0" type="danger"  @click="goCooperate">去协作</el-button>
<!--                <el-button  v-if="isCooperated === 1" type="primary"  @click="goReportInfoCooperation">我的协作</el-button>-->
              </div>
             </el-card>
        </div>
    </div>
    </el-main>
  </el-container>
</template>

<script>
import {employeeGetReportInfo} from "@/api/report";
import {employerGetReportInfo} from "@/api/report";
import {reactive} from "vue"
import {scoreReport} from "@/api/report";
import {showReportScore} from "@/api/report"
import {wantCooperate} from "@/api/report";
import ReportInfoItem from "@/components/ReportInfoItem"
import {ElMessage} from "element-plus";

const score_form = reactive({
  comment: '',
  value:1,

})

const show_score_form = reactive({
  comment: '',
  value:1,

})

const validScore = function (rule,value,callback) {
  if(score_form.value === 0)
  {
    callback(new Error('请给报告评分'))
  }
  callback()
}

const rules = reactive({
    comment:[
    {
      required: true,
      message: '请输入评价',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 40,
      massage: '评价不少于5个字符，不多于40个字符',
      trigger: 'blur'
    }],
    score:[
        {
          required:true,
          validator:validScore,
          trigger:'blur'
        }
      ]

})

export default {
  name: "ReportInfo",
  data(){
    return {
      parentReport:{
        taskId:this.$route.query.taskId,
        workId:9,
        reportName: '测试报告',
        defectPictureList:[],
        defectExplain:'',
        defectReproduction:'',
        testEquipmentInfo:'',
        totalScore:3,
      },
      isScored:0,
      isCooperated: 0,
      score_form,
      show_score_form,
      rules,
      role:window.localStorage.getItem("role"),
      srcList:[],
      reportId:this.$route.query.reportId,
      taskId:this.$route.query.taskId
    }
  },
  components:{
    ReportInfoItem
  },
  mounted() {
    if (this.role === '0' || this.role === '2') {
      employerGetReportInfo({taskId: this.$route.query.taskId, reportId: this.$route.query.reportId})
          .then(res => {
            if (res.response.code % 100 === 0) {
              this.parentReport.defectExplain = res.defectExplain
              this.parentReport.defectPictureList = res.defectPictureList
              this.parentReport.defectReproduction = res.defectReproduction
              this.parentReport.testEquipmentInfo = res.testEquipmentInfo
              this.parentReport.reportName = res.reportName
              this.parentReport.totalScore = res.totalScore
              this.parentReport.workerId = res.workerId
              this.isScored = res.isScored
              if (this.isScored === 1) {
                showReportScore({reportId: this.$route.query.reportId})
                    .then(res => {
                      if (res.response.code % 100 === 0) {
                        this.show_score_form.comment = res.comment
                        this.show_score_form.value = res.score
                      }
                      else {
                        ElMessage.error(res.response.message)
                      }
                    })
              }
            } else {
              ElMessage.error(res.response.message)
            }
          })
    }
    if (this.role === '1') {
      employeeGetReportInfo({taskId: this.$route.query.taskId, reportId: this.$route.query.reportId})
          .then(res => {
            if (res.response.code % 100 === 0) {
              console.log(res.response.message)
              this.parentReport.defectExplain = res.defectExplain
              this.parentReport.reportName = res.reportName
              this.parentReport.defectPictureList = res.defectPictureList
              this.parentReport.defectReproduction = res.defectReproduction
              this.parentReport.testEquipmentInfo = res.testEquipmentInfo
              this.parentReport.workerId = res.workerId
              this.parentReport.totalScore = res.totalScore
              this.isCooperated = res.isCooperated
              this.isScored = res.isScored
              if (this.isScored === 1) {
                showReportScore({reportId: this.$route.query.reportId})
                    .then(res => {
                      if (res.response.code % 100 === 0) {
                        this.show_score_form.comment = res.comment
                        this.show_score_form.value = res.score
                      }
                      else {
                        ElMessage.error(res.response.message)
                      }
                    })
              }
            } else {
              ElMessage.error(res.response.message)
            }
          })
    }

  },
  methods:{
   handleSubmit(formName) {
      this.$refs[formName].validate(valid =>{
        if (valid){
          scoreReport({score:this.score_form.value,reportId:this.$route.query.reportId,comment:this.score_form.comment})
              .then(res => {
                if (res.response.code%100 === 0) {
                  console.log(res.response.message)
                  //this.$router.push("/taskReleaseSucceed")
                  this.$message({
                    message: '报告评分成功！',
                    grouping: true,
                    type: 'success',
                    onClose:()=>{
                      location.reload()
                    }
                  })
                } else {
                  ElMessage.error(res.response.message)
                }
              })
          return true
        }else{
          alert("必填项不能为空")
          return false
        }
      })
    },
    cancelSubmit(){
      this.$router.back(-1)
    },
    goCooperate(){
     wantCooperate({reportId:this.$route.query.reportId})
      .then(res => {
        if(res.response.code %100 === 0)
        {
          ElMessage.success({
            message:'参与协作成功，可在个人中心-可协作列表中查看',
            duration:1000,
            onClose:() => {
              this.$router.push({
                name:'ReportCooperate',
                query:{
                  taskId:this.taskId,
                  reportId:this.reportId
                }
              })
            }
          })
        }
        else {
          ElMessage.error(res.response.message)
        }
      })

    },
    // goReportInfoCooperation(){
    //   this.$router.push({
    //     name:'ReportInfoCooperation',
    //     query:{
    //       taskId:this.$route.query.taskId,
    //       reportId:this.$route.query.reportId
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>

</style>