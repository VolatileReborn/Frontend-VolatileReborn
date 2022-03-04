<template>
  <div style="display: flex;justify-content: center;text-align: center">
  <el-card style="width: 80%">
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
      <el-form :model="report_form" label-width="120px" label-position="right" style="width:80%" :rules="rules">
        <el-form-item label="缺陷情况说明" prop="defectExplain">
          <el-input v-model="report_form.defectExplain" :rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="缺陷复现步骤" prop="defectReproductionStep">
          <el-input v-model="report_form.defectReproductionStep" :rows="2" type="textarea" />
        </el-form-item>
        <el-form-item label="测试设备信息" prop="testEquipmentInformation">
          <el-input v-model="report_form.testEquipmentInformation" placeholder="从应用启动到缺陷出现的操作步骤"></el-input>
        </el-form-item>
        <el-form-item label="缺陷应用截图" required>
          <el-upload
            action=""
            show-file-list
            :auto-upload="true"
            :http-request="fnUploadRequest"
            :on-success="handleUploadSuccess"
            :file-list="fileList"
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
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="cancelSubmit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  </div>
</template>

<script>
import {employeeTaskDetail} from "@/api/square";
import {Checked} from "@element-plus/icons-vue"
import {reactive} from "vue"
import {publishReport} from "@/api/report";
import oss from '@/utils/oss'

const report_form = reactive({
  defectPictureList:[],
  defectExplain:'',
  defectReproductionStep:'',
  testEquipmentInformation:''
})

const rules = reactive({
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
})

export default {
  name: "ReportRelease",
  data(){
    return {
      report_form,
      rules,
      task:{},
      taskId:this.$route.params.taskId,
      fileList:[],
    }
  },
  mounted() {
    employeeTaskDetail({taskId:this.taskId,token:window.localStorage.getItem("token")})
    .then(res => {
      if(res.code === 1)
      {
        console.log("获取任务数据成功")
        this.task = res.data.task
      }
      else
      {
        console.log(res.msg)
      }
    })
  },
  components:{
    Checked
  },
  methods:{
    onSubmit() {
      const token = window.localStorage.getItem("token")
      publishReport({testReport: report_form,token:token,taskId:this.taskId})
      .then(res =>{
        if(res.code === 1)
        {
          console.log(res.msg)
          console.log(res.data.testReport)
        }
        else
        {
          console.log(res.msg)
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
          fileUrl:res.fileUrl
        }
        report_form.defectPictureList.push(file)
      })
    },
    handleUploadSuccess(){
      console.log(report_form.defectPictureList)
      //todo:添加路由：报告提交成功
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