<template>
  <el-container style="height: 90vh">
    <el-aside width="40%" style="background-color: rgba(220,220,220,0.7);font-size: larger">
      <el-tag style="position: absolute;left: 10px;font-size: small;margin-top: 10px">协作父报告</el-tag>
      <report-info-item v-bind:task-report="parentReport" style="width:90%;height: 85vh"></report-info-item>
    </el-aside>
    <el-main style="border: 1px solid #d3dce6">
      <el-tag style="position: absolute;font-size: small;margin-top: -10px">协作子报告</el-tag>
      <el-form ref="basicInfo" :model="report_form" label-width="120px" label-position="right" style="width:80%;margin-top: 50px;margin-left: 80px" :rules="rules">
        <el-form-item label="测试报告名称" prop="reportName">
          <el-input v-model="report_form.reportName" />
        </el-form-item>
        <el-form-item label="缺陷情况说明" prop="defectExplain">
          <el-input v-model="report_form.defectExplain" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="缺陷复现步骤" prop="defectReproductionStep">
          <el-input v-model="report_form.defectReproductionStep" :rows="2" type="textarea" placeholder="从应用启动到缺陷出现的操作步骤"/>
        </el-form-item>
        <el-form-item label="测试设备信息" prop="testEquipmentInformation">
          <el-input v-model="report_form.testEquipmentInformation" ></el-input>
        </el-form-item>
        <el-form-item label="缺陷应用截图" prop="defectPictureList">
          <el-upload
              action=""
              show-file-list
              :auto-upload="true"
              :http-request="fnUploadRequest"
              :on-success="handleUploadSuccess"
              :file-list="fileList"
              accept=".jpg,.jpeg,.png,.gif"
              list-type="picture">
            <el-button type="primary">点击上传应用截图</el-button>
            <template #tip>
              <div style="color: #9A9A9A">
                请上传.jpg,.jpeg,.png类型的文件
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-left: 200px;margin-top: 50px">
          <el-button type="primary" @click="onSubmit('basicInfo')">提交</el-button>
          <el-button @click="cancelSubmit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {employeeGetReportInfo} from "@/api/report";
import {reactive} from "vue"
import {publishCooperation} from "@/api/report";
import ReportInfoItem from "@/components/ReportInfoItem"
import oss from '@/utils/oss'
import {ElMessage} from 'element-plus'
const report_form = reactive({
  reportName:'',
  defectPictureList:[],
  defectExplain:'',
  defectReproductionStep:'',
  testEquipmentInformation:'',
  parentReportId:0
})

const validPics = function (rule,value,callback) {
  if(report_form.defectPictureList.length === 0)
  {
    callback(new Error('请上传缺陷应用截图'))
  }
  callback()
}

const rules = reactive({
      reportName:[
        {
          required:true,
          message:'请填写报告名称',
          trigger:'blur'
        }
      ],
      defectExplain:[
        {
          required:true,
          message:'请填写缺陷情况说明',
          trigger:'blur'
        },
        {
          min:5,
          max:100,
          message: '缺陷情况说明不得少于5个字符，不得多于100个字符',
          trigger: 'blur'
        }
      ],
      defectReproductionStep: [
        {
          required:true,
          message:'请填写缺陷复现步骤',
          trigger:'blur'
        },
        {
          min:5,
          max:100,
          message: '缺陷复现步骤不得少于5个字符，不得多于100个字符',
          trigger:'blur'
        }
      ],
      testEquipmentInformation:[
        {
          required:true,
          message:'请填写测试设备信息',
          trigger:'blur'
        },
        {
          min:5,
          max:20,
          message: '测试设备信息不得少于5个字符，不得多于20个字符',
          trigger:'blur'
        }
      ],
      defectPictureList:[
        {
          required:true,
          validator:validPics,
          trigger:'blur'
        }
      ]
    },
)
export default {
  name: "ReportCooperate",
  data(){
    return {
      parentReport:{},
      srcList:[],
      report_form,
      rules,
      fileList:[]
  }
  },
  components:{
    
    ReportInfoItem
  },
  mounted() {
      employeeGetReportInfo({taskId:this.$route.query.taskId,reportId:this.$route.query.reportId})
    .then(res => {
      if(res.response.code%100 === 0){
        this.parentReport.defectExplain = res.defectExplain
        this.parentReport.reportName = res.reportName
        this.parentReport.workId = res.workId
        this.parentReport.totalScore = res.totalScore
        this.parentReport.defectPictureList = res.defectPictureList
        this.parentReport.defectReproduction = res.defectReproduction
        this.parentReport.testEquipmentInfo = res.testEquipmentInfo
      }
      else {
        ElMessage.error(res.response.message)
      }
    })
  },
  methods:{
    onSubmit(formName) {
      this.$refs[formName].validate(valid =>{
        if (valid){
          report_form.parentReportId = this.$route.query.reportId
           publishCooperation({taskId:this.$route.query.taskId,taskReport:report_form})
              .then(res =>{
                if(res.response.code%100 === 0)
                {
                  console.log(res.response.message)
                  this.$router.push("/reportReleaseSucceed")
                }
                else
                {
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
    async fnUploadRequest(option){
      await oss.ossUploadFile(option).then(res => {
        const file = {
          fileName:res.fileName,
          fileURL:res.fileUrl
        }
        report_form.defectPictureList.push(file)
      })
    },
    handleUploadSuccess() {
      console.log(report_form.defectPictureList)

    }
  }
}
</script>

<style scoped>

</style>