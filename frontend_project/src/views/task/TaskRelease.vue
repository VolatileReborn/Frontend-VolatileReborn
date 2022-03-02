<template>
  <div class="container">
  <el-card class="box_card">
    <template #header>
      <div class="card_header">
        <span style="font-weight: bolder">任务信息提交</span>
      </div>
    </template>
    <div class="input_container">
      <el-form :model="task_form" label-width="120px" label-position="right" :rules="rules" >
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="task_form.taskName" ></el-input>
        </el-form-item>
        <el-form-item label="任务简介" prop="taskIntroduction">
          <el-input v-model="task_form.taskIntroduction" :rows="3" type="textarea" ></el-input>
        </el-form-item>
        <el-form-item label="测试时间段" required>
          <el-col :span="11">
            <el-form-item prop="taskStartTime">
              <el-date-picker
                v-model="task_form.taskStartTime"
                type="date"
                style="width:100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="display: flex;text-align: center;justify-content: center">
            <span >-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="taskEndTime">
              <el-date-picker
                v-model="task_form.taskEndTime"
                type="date"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item style="margin-left: -120px">
          <el-col :span="11">
            <el-form-item label="工人数量"  required>
              <el-input-number v-model="task_form.workerNumTotal" :min="1" :max="20" :step="1" style="width: 200px" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="测试类型" required prop="taskType">
              <el-select v-model="task_form.taskType" >
                <el-option
                  v-for="item in taskTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="附件" required >
          <div style="display: flex;flex-direction: column">
            <el-upload
              action=""
              show-file-list
              accept=".exe,.apk,.jar"
              :limit="1"
              :on-success="handleUploadSuccess1"
              >
              <el-button type="primary" plain>点击上传待测应用可执行文件</el-button>
              <template #tip>
                <div style="color:#9A9A9A;font-size: small;margin-left: 5px">
                请上传.exe,.apk,.jar类型的文件
                </div>
              </template>
            </el-upload>
            <el-upload
                action=""
                :limit="1"
                show-file-list
                accept=".md,.doc,.pdf,.docx"
                :on-success="handleUploadSuccess2"
                >
              <el-button type="primary" plain >点击上传测试需求描述文件</el-button>
              <template #tip>
                <div style="color:#9A9A9A;font-size: small;margin-left: 5px">
                  请上传.doc,.md,.pdf,.docx类型的文件
                </div>
              </template>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item style="margin-left: 340px">
          <el-button type="primary" @click="handleSubmit">提交任务</el-button>
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
const task_form = reactive({
  taskName: '',
  taskIntroduction: '',
  taskStartTime: '',
  taskEndTime: '',
  workerNumTotal: 1,
  taskType: '',
  executableFileList:[],
  requirementDescriptionFileList:[]
})
const rules = reactive({
  taskName: [
    {
      required: true,
      message: '请输入任务名称',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 8,
      message: '任务名称不少于3个字符，不多于8个字符',
      trigger: 'blur'
    }
  ],
  taskIntroduction:[
    {
      required: true,
      message: '请输入任务简介',
      trigger: 'blur'
    },
    {
      min: 5,
      max: 40,
      massage: '任务简介不少于5个字符，不多于40个字符',
      trigger: 'blur'
    }
  ],
  taskStartTime:[
    {
      type: 'date',
      required: true,
      message: '请选择任务开始时间，注意不要早于当前时间',
      trigger: 'change'
    }
  ],
  taskEndTime:[
    {
      type: 'date',
      required: true,
      message: '请选择任务结束时间',
      trigger: 'change'
    }
  ],
  taskType: [
    {
      required: true,
      message: '请选择测试类型',
      trigger: 'change'
    }
  ]
})

const handleUploadSuccess1 = (response,file) => {
  let fileUrl = response.data.url;
  let fileName = file.name
  task_form.executableFileList.push({name:fileName,url:fileUrl})
}

const handleUploadSuccess2 = (response,file) => {
  let fileUrl = response.data.url;
  let fileName = file.name
  task_form.requirementDescriptionFileList.push({name:fileName,url:fileUrl})
}

export default {
  name: "TaskRelease",
  data() {
    return {
      task_form,
      rules,
      taskTypes:[
        {
          value:'功能测试',
          label: '功能测试'
        },
        {
          value: '性能测试',
          label: '性能测试',
        }
      ]
    }
  },
  components:{

  },
  methods: {
    handleUploadSuccess1,
    handleUploadSuccess2,
    handleSubmit(){

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