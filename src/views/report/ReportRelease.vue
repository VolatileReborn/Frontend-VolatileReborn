<template>
  <div style="display: flex;justify-content: center;text-align: center">
  <el-card style="width: 70%;padding-left: 50px" v-loading="isLoading"  element-loading-text="报告相似度计算中...">
    <template #header>
      <span style="font-weight: bolder;font-size:x-large">测试报告提交</span>
    </template>
    <div class="task_container">
      <el-descriptions>
        <template #title>
          <span>任务名称： {{task.taskName}}</span>
        </template>
        <el-descriptions-item label="任务简介">{{task.taskIntroduction}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="report_container">
      <div class="report_head_container">
        <el-icon color="#409efc" :size="30">
          <checked />
        </el-icon>
        <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷提交</div>
      </div>
      <el-form ref="basicInfo" :model="report_form" label-width="120px" label-position="right" style="width:80%" :rules="rules" class="basicInfo">
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit('basicInfo')" v-if="this.$route.query.reportId === undefined">提交</el-button>
          <el-button type="primary" @click="onChange('basicInfo')" v-else>修改</el-button>
          <el-button @click="cancelSubmit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  </div>
</template>

<script>
import {employeeTaskDetail} from "@/api/square";
import {employeeGetReportInfo} from "@/api/report";
import {Checked} from "@element-plus/icons-vue"
import {ElMessage} from 'element-plus'
import {reactive} from "vue"
import {publishReport} from "@/api/report";
import {changeReport} from "@/api/report";
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
    },
    {
      min:2,
      max:10,
      message: '报告名称不得少于2个字符，不得多于10个字符',
      trigger: 'blur'
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
      max:500,
      message: '缺陷情况说明不得少于5个字符，不得多于500个字符',
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
      max:500,
      message: '缺陷复现步骤不得少于5个字符，不得多于500个字符',
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
      min:1,
      max:20,
      message: '测试设备信息不得少于1个字符，不得多于20个字符',
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
  name: "ReportRelease",
  data(){
    return {
      report_form,
      rules,
      task:{},
      taskId:this.$route.query.taskId,
      fileList:[],
      isLoading: false
    }
  },
  mounted() {
    employeeTaskDetail({taskId:this.taskId})
    .then(res => {
      if(res.response.code%100 === 0)
      {
        console.log("获取任务数据成功")
        this.task = res.task
        report_form.reportName = ''
        report_form.defectPictureList=[]
        report_form.defectReproductionStep=''
        report_form.defectExplain=''
        report_form.testEquipmentInformation=''
      }
      else
      {
        ElMessage.error(res.response.message)
      }
    })
    if(this.$route.query.reportId!==undefined)
    {
      setTimeout(()=>{employeeGetReportInfo({taskId:this.taskId,reportId:this.$route.query.reportId})
          .then(res => {
            if(res.response.code % 100 === 0){
              report_form.reportName = res.reportName
              // report_form.defectPictureList= res.defectPictureList
              report_form.defectReproductionStep= res.defectReproduction
              report_form.defectExplain= res.defectExplain
              report_form.testEquipmentInformation= res.testEquipmentInfo
            }
            else {
              ElMessage.error(res.response.message)
            }
          })},10)
    }

  },
  components:{
    Checked
  },
  methods:{
    onSubmit(formName) {
      this.$refs[formName].validate(valid =>{
        if (valid){
          this.isLoading = true
          publishReport({testReport: report_form,taskId:this.taskId})
          .then(res =>{
            this.isLoading = false
        if(res.response.code%100 === 0)
        {
          // console.log(res.response.message)
          // this.$router.push("/reportReleaseSucceed")

          ElMessage({
            message:res.response.message,
            type:'success',
            duration:1000,
            onClose:()=>{
              this.$router.push("/taskInfoFromUser/"+this.taskId).then(()=> {
                location.reload()
              })
            }
          })
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
    onChange(formName) {
      this.$refs[formName].validate(valid =>{
        if (valid){
          this.isLoading = true
          console.log(report_form)
          changeReport({taskReport:report_form,taskId:this.taskId,reportId:this.$route.query.reportId})
              .then(res =>{
                this.isLoading = false
                if(res.response.code%100 === 0)
                {

                  // console.log(res.response.message)
                  // this.$router.push("/reportReleaseSucceed")
                  ElMessage({
                    message:res.response.message,
                    type:'success',
                    duration:1000,
                    onClose:()=>{
                      this.$router.push("/taskInfoFromUser/"+this.taskId).then(()=> {
                        location.reload()
                      })
                    }
                  })
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
.report_head_container{
  display: flex;
  flex-direction: row;
}
</style>