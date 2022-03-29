<template>
  <el-container style="height: 90vh">
    <el-aside width="40%" style="background-color: rgba(220,220,220,0.7);font-size: larger">
      <el-tag style="position: absolute;left: 10px;font-size: small;margin-top: 10px">协作父报告</el-tag>
     <el-row style="justify-content: center;margin-top: 50px">
       <el-col span="24" style="font-size: larger;font-weight: bolder;font-family: 幼圆">{{parentReport.taskReport}}</el-col>
     </el-row>
      <div style="padding:10px">
      <el-row style="margin-top: 80px;justify-content: center">
        <el-col span="8" style="color: #409efc">缺陷情况详情：</el-col>
        <el-col span="16" style="font-weight: bold">{{parentReport.defectExplain}}</el-col>
      </el-row>
        <el-row style="margin-top: 50px;justify-content: center">
        <el-col span="8" style="color: #409efc">缺陷复现步骤：</el-col>
        <el-col span="16" style="font-weight: bold">{{parentReport.defectReproduction}}</el-col>
      </el-row>
        <el-row style="margin-top: 50px;justify-content: center">
        <el-col span="8" style="color: #409efc">测试设备信息：</el-col>
        <el-col span="16" style="font-weight: bold">{{parentReport.testEquipmentInfo}}</el-col>
      </el-row>
        <el-row style="margin-top: 50px;justify-content: center">
        <el-col span="8" style="color: #409efc">缺陷应用截图：</el-col>
          <el-col span="16"><div  style="display:flex;flex-direction: row;margin-top: 5px">
            <div v-for="item in parentReport.defectPictureList"
                 v-bind:key="item.fileName" >
              <el-image :src="item.fileURL"  alt="" style="height: 15vh;margin-left: 5px" :preview-src-list="srcList" :initial-index="0" lazy fit="scale-down"/>
            </div>
          </div></el-col>
      </el-row>
      </div>
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
import oss from '@/utils/oss'
const report_form = reactive({
  reportName:'',
  defectPictureList:[],
  defectExplain:'',
  defectReproductionStep:'',
  testEquipmentInformation:''
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
      parentReport:{
        taskReport: '测试报告',
        defectPictureList:[],
        defectExplain:'',
        defectReproduction:'',
        testEquipmentInfo:''
      },
      srcList:[],
      report_form,
      rules,
      fileList:[]
  }
  },
  mounted() {
    console.log(this.$route.params)
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
  },
  methods:{
    onSubmit(formName) {
      this.$refs[formName].validate(valid =>{
        if (valid){
           publishCooperation({taskId:this.$route.params.taskId,parentId:this.$route.params.reportId,taskReport:report_form})
              .then(res =>{
                if(res.response.code%100 === 0)
                {
                  console.log(res.response.message)
                  this.$router.push("/reportReleaseSucceed")
                }
                else
                {
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