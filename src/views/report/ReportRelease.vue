<template>
  <div class="container">
  <el-card class="box_card">
    <template #header>
      <div class="card_header">
        <span style="font-weight: bolder">测试报告上传</span>
      </div>
    </template>
    <div class="input_container">
      <el-form :model="task_form" label-width="120px" label-position="right" :rules="rules" >
        
        <el-form-item label="缺陷情况详情" prop="taskIntroduction" required>
          <el-input v-model="report_form.defectExplain" :rows="3" type="textarea" ></el-input>
        </el-form-item>
        <el-form-item label="缺陷复现步骤" prop="taskIntroduction" required>
          <el-input v-model="report_form.defectReproductionStep" :rows="3" type="textarea" ></el-input>
        </el-form-item>
        <el-form-item label="测试设备信息" prop="taskIntroduction" required>
          <el-input v-model="report_form.testEquipmentInformation" ></el-input>
        </el-form-item>
        
        <el-form-item label="附件" required >
          <div style="display: flex;flex-direction: column">
            <el-upload
              action=""
              show-file-list
              accept=".exe,.apk,.jar"
              :limit="1"
              :on-success="handleUploadSuccess3"
              >
              <el-button type="primary" plain>点击上传出现缺陷的应用截图</el-button>
              <template #tip>
                <div style="color:#9A9A9A;font-size: small;margin-left: 5px">
                请上传.jpg, .png, .jpeg等图片类型的文件
                </div>
              </template>
            </el-upload>
            
          </div>
        </el-form-item>
        <el-form-item style="margin-left: 340px">
          <el-button type="primary" @click="handleSubmit">提交测试报告</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  </div>
</template>

<script >

import {reactive} from "vue";
// interface RawFile {
//   name: string
//   url: string
// }
const report_form = reactive({
  
  defectExplain:'',
  defectReproductionStep:'',
  testEquipmentInformation:'',
  
  pictureList:[],
  
})
const rules = reactive({
 
  defectExplain:[
    {
      required: true,
      message: '请输入缺陷情况说明',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 40,
      massage: '缺陷情况说明不少于5个字符，不多于40个字符',
      trigger: 'blur'
    }
  ],
  defectReproductionStep:[
    {
      required: true,
      message: '请输入缺陷复现步骤',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 100,
      massage: '缺陷复现步骤不少于5个字符，不多于100个字符',
      trigger: 'blur'
    }
  ],
  testEquipmentInformation: [
    {
      required: true,
      message: '请输入测试设备信息',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 8,
      message: '测试设备信息不少于3个字符，不多于8个字符',
      trigger: 'blur'
    }
  ]
})


const handleUploadSuccess3 = (response,file) => {
  let fileUrl = response.data.url;
  let fileName = file.name
  report_form.pictureList.push({name:fileName,url:fileUrl})
}

export default {
  name: "ReportRelease",
  data() {
    return {
      report_form,
      rules,
      
    }
  },
  components:{

  },
  methods: {
    
    handleUploadSuccess3,
    handleSubmit(){
      this.$router.push("/reportReleaseSucceed")
    },
    goBack(){
      this.$router.back(-1)
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  text-align: center;
  justify-content: center;
}
.box_card{
  width: 80%;
  margin-top: 20px;
}
.card_header{
  text-align: left;
}
.input_container{
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>