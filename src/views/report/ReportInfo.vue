<template>
  <el-container style="height: 90vh">
    <el-aside width="40%" style="background-color: rgba(220,220,220,0.7);font-size: larger">
      <el-tag style="position: absolute;left: 10px;font-size: small;margin-top: 10px">协作父报告</el-tag>
      <report-info-item v-bind:reportInfo="parentReport"></report-info-item>
    </el-aside>
    <el-main style="border: 1px solid #d3dce6">
    <el-tag style="position: absolute;font-size: small;margin-top: -10px">报告评分</el-tag>
    <div class="container">
        <div v-if="parentReport.isScored === 0">
            <el-card class="box_card">
            <template #header>
            <div class="card_header">
                <span style="font-weight: bolder">报告评分</span>
            </div>
            </template>
            <div class="input_container">
            <el-form ref="basicInfo" :model="score_form" label-width="120px" label-position="right" :rules="rules" class="basicInfo" >  
                <el-form-item label="评分" prop="score">
                    <el-rate v-model="score_form.value" :texts="['很差', '较差', '一般', '良好', '非常好']" show-text/>
                </el-form-item>
                <el-form-item label="评价" prop="comment">
                    <el-input v-model="score_form.comment" :rows="3" type="textarea" ></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 340px">
                    <el-button type="primary" @click="handleSubmit('basicInfo')">提交评价</el-button>
                    <el-button @click="goBack">取消</el-button>
                </el-form-item>
                <el-form-item v-if="role === '1'" style="margin-left: 340px">
                    <el-button  v-if="parentReport.isCooperated === 0" type="danger"  @click="goRelease">去协作</el-button>
                    <el-button  v-if="parentReport.isCooperated === 1" type="primary"  @click="goReportInfo">我的协作</el-button>
                </el-form-item>
            </el-form>
            </div>
             </el-card>
        </div>
        <div v-if="parentReport.isScored === 1">
            <el-card class="box_card">
            <template #header>
            <div class="card_header">
                <span style="font-weight: bolder">报告评分</span>
            </div>
            </template>
            <div class="input_container">
            <el-form ref="basicInfo" :model="show_score_form" label-width="120px" label-position="right" :rules="rules" class="basicInfo" >  
                <el-form-item label="评分" prop="score">
                    <el-rate v-model="show_score_form.value" disabled show-score text-color="#ff9900" score-template="{show_score_form.value} points"/>
                </el-form-item>
                <div style="margin-top: 10px">评论 ： <span style="font-weight: bold">{{show_score_form.comment}}</span></div>
                <el-form-item v-if="role === '1'" style="margin-left: 340px">
                    <el-button  v-if="parentReport.isCooperated === 0" type="danger"  @click="goRelease">去协作</el-button>
                    <el-button  v-if="parentReport.isCooperated === 1" type="primary"  @click="goReportInfo">我的协作</el-button>
                </el-form-item>
            </el-form>
            </div>
             </el-card>
        </div>
        <!-- <div v-if="role === '1'" style="position: relative;margin-left: 1000px" >
            
        </div>         -->
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
import ReportInfoItem from "@/components/ReportInfoItem"

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
        taskReport: '测试报告',
        defectPictureList:[],
        defectExplain:'',
        defectReproduction:'',
        testEquipmentInfo:'',
        isCooperated:0,
        isScored:0
      },
      score_form,
      show_score_form,
      rules,
      token: window.localStorage.getItem("token"),
      role:window.localStorage.getItem("role")
    }
  },
  components:{
    ReportInfoItem
  },
  mounted() {
    console.log(this.$route.params)
    if (this.role === '0' ) {
      employerGetReportInfo({taskId:this.$route.params.taskId,reportId:this.$route.params.reportId})
    .then(res => {
      if(res.response.code%100 === 0){
        console.log(res.response.message)
        this.parentReport.defectExplain = res.defectExplain
        // this.parentReport.taskReport = res.taskReport
        this.parentReport.defectPictureList = res.defectPictureList
        this.parentReport.defectPictureList.forEach(item => {
          this.srcList.push(item.fileURL)
        })
        this.parentReport.defectReproduction = res.defectReproduction
        this.parentReport.testEquipmentInfo = res.testEquipmentInfo
      }
    })
    }
    if (this.role === '1' ) {
      employeeGetReportInfo({taskId:this.$route.params.taskId,reportId:this.$route.params.reportId})
    .then(res => {
      if(res.response.code%100 === 0){
        console.log(res.response.message)
        this.parentReport.defectExplain = res.defectExplain
        // this.parentReport.taskReport = res.taskReport
        this.parentReport.defectPictureList = res.defectPictureList
        this.parentReport.defectPictureList.forEach(item => {
          this.srcList.push(item.fileURL)
        })
        this.parentReport.defectReproduction = res.defectReproduction
        this.parentReport.testEquipmentInfo = res.testEquipmentInfo
      }
    })
    }
    
    showReportScore({reportId:this.$route.params.reportId})
    .then(res => {
      if(res.response.code%100 === 0){
        console.log(res.response.message)
        this.show_score_form.comment=res.comment
        this.show_score_form.value=res.score
        
      }
    })
  },
  methods:{
   handleSubmit(formName) {
      this.$refs[formName].validate(valid =>{
        if (valid){
          scoreReport({score:this.score_form.value,reportId:this.$route.params.reportId,comment:this.score_form.comment})
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
                  console.log(res.response.message)
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
    }
  }
}
</script>

<style scoped>

</style>