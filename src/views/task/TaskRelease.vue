<template>
  <div class="container">
  <el-card class="box_card">
    <template #header>
      <div class="card_header">
        <span style="font-weight: bolder">任务信息提交</span>
      </div>
    </template>
    <div class="input_container">
      <el-form ref="basicInfo" :model="task_form" label-width="120px" label-position="right" :rules="rules" class="basicInfo" >
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
                placeholder="选择任务开始时间"
                value-format="x"
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
                placeholder="选择任务截至时间"
                value-format="x"
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
        <el-form-item style="margin-left: -120px">
          <el-col :span="8">
            <el-form-item label="任务难度"  required>
              <el-slider v-model="task_form.taskDifficulty"  :step="1" style="width: 200px" :min="1" :max="5"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务紧急程度"  required>
              <el-slider v-model="task_form.taskUrgency"  :step="1" style="width: 200px" :min="0" :max="5"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="测试设备需求"  required>
              <el-select
                  v-model="task_form.devices"
                  multiple
                  style="width: 240px"
              >
                <el-option
                  v-for="item in deviceOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="附件"  prop="executableFileList" >
          <div style="display: flex;flex-direction: column">
            <el-upload
              action=""
              show-file-list
              accept=".exe,.apk,.jar,.c,.cpp,.py"
              :auto-upload="true"
              :http-request="fnUploadRequest"
              :on-success="handleUploadSuccess1"
              >
              <el-button type="primary" plain>点击上传待测应用可执行文件</el-button>
<!--              <template #tip>-->
<!--                <div style="color:#9A9A9A;font-size: small;margin-left: 5px">-->
<!--                请上传.exe,.apk,.jar类型的文件-->
<!--                </div>-->
<!--              </template>-->
            </el-upload>
            <el-upload
                action=""
                show-file-list
                :auto-upload="true"
                :http-request="fnUploadRequest1"
                accept=".md,.doc,.pdf,.docx"
                :on-success="handleUploadSuccess2"
                >
              <el-button type="primary" plain >点击上传测试需求描述文件</el-button>
<!--              <template #tip>-->
<!--                <div style="color:#9A9A9A;font-size: small;margin-left: 5px">-->
<!--                  请上传.doc,.md,.pdf,.docx类型的文件-->
<!--                </div>-->
<!--              </template>-->
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item style="margin-left: 340px">
          <el-button type="primary" @click="handleSubmit('basicInfo')">提交任务</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  </div>
</template>

<script >
import {publishTask} from "@/api/task";
import {reactive} from "vue";
import oss from "@/utils/oss"
import {debounce} from "@/utils/utils";
import {ElMessage} from 'element-plus'

const task_form = reactive({
  taskName: '',
  taskIntroduction: '',
  taskStartTime: '',
  taskEndTime: '',
  workerNumTotal: 1,
  taskType: '',
  taskDifficulty:1,
  taskUrgency:0,
  devices:[],
  executableFileList:[],
  requirementDescriptionFileList:[]
})
const validStart = debounce(function (rule,value,callback) {
  // ElMessage.error('任务开始时间不得早于当前时间')
  if(task_form.taskStartTime <new Date().getTime() - 60*60*24*1000)
  {
    callback(new Error('任务开始时间不得早于当前日期'))
  }
  callback()
},100)
const validEnd = function (rule, value,callback)  {
  if(task_form.taskEndTime <= task_form.taskStartTime)
  {
    callback(new Error('任务结束时间不得早于开始时间'))
  }
  callback()
}
const validFiles = function (rule,value,callback) {
  if(task_form.executableFileList.length === 0 || task_form.requirementDescriptionFileList.length === 0)
  {
    callback(new Error('请上传相关文件'))
  }
  callback()
}
const rules = reactive({
  taskName: [
    {
      required: true,
      message: '请输入任务名称',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 15,
      message: '任务名称不少于3个字符，不多于15个字符',
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
      required: true,
      message: '请选择任务开始时间，注意不要早于当前时间',
      trigger: 'change'
    },
    {
      trigger: 'change',
      type:'date',
      validator:validStart
    }
  ],
  taskEndTime:[
    {
      required: true,
      message: '请选择任务结束时间',
      trigger: 'change'
    },
    {
      trigger: 'change',
      type:'date',
      validator:validEnd
    }
  ],
  taskType: [
    {
      required: true,
      message: '请选择测试类型',
      trigger: 'change'
    }
  ],
  executableFileList:[
    {
      required:true,
      validator:validFiles,
      trigger:'blur'
    }
  ]
})
const deviceOptions = [
  {
    value:'android',
    label:'Android'
  },
  {
    value: 'ios',
    label: 'IOS'
  },
  {
    value: 'linux',
    label: 'Linux'
  }
  // ,
  // {
  //   value:'windows',
  //   label:'Windows'
  // },
  // {
  //   value:'harmonyos',
  //   label:'HarmonyOS'
  // }
]
export default {
  name: "TaskRelease",
  data() {
    return {
      task_form,
      rules,
      taskTypes: [
        {
          value: 0,
          label: '功能测试'
        },
        {
          value: 1,
          label: '性能测试',
        }
      ],
      token: window.localStorage.getItem("token"),
      deviceOptions
    }
  },
  components: {},
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid =>{
        if (valid){
          const task = {
            "requirementDescriptionFileList": this.task_form.requirementDescriptionFileList,
            "executableFileList": this.task_form.executableFileList,
            "taskIntroduction": this.task_form.taskIntroduction,
            "taskStartTime": this.task_form.taskStartTime,
            "taskEndTime": this.task_form.taskEndTime,
            "taskType": this.task_form.taskType,
            "taskName": this.task_form.taskName,
            "workerNumTotal":this.task_form.workerNumTotal,
            "taskDifficulty":this.task_form.taskDifficulty,
            "taskUrgency":this.task_form.taskUrgency,
            "android":this.task_form.devices.includes('android') ,
            "linux":this.task_form.devices.includes('linux')  ,
            "ios":this.task_form.devices.includes('ios')  ,
            "windows":this.task_form.devices.includes('windows') ,
            "harmonyos":this.task_form.devices.includes('harmonyos')  ,
          }
          publishTask({task: task})
              .then(res => {
                if (res.response.code%100 === 0) {
                  // console.log(res.response.message)
                  // console.log(res.task)
                  // this.$router.push("/taskReleaseSucceed")
                  ElMessage({
                    message:'任务发布成功',
                    type:'success',
                    duration:1000,
                    onClose:()=>{
                      this.$router.push('/userCenterofEmployer')
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
    goBack() {
      this.$router.back(-1)
    },
    async fnUploadRequest(option) {
      await oss.ossUploadFile(option).then(res => {
        const file = {
          fileName : res.fileName,
          fileURL: res.fileUrl
        }
        task_form.executableFileList.push(file)
        console.log(task_form.executableFileList)
      })
    },
    async fnUploadRequest1(option) {
      await oss.ossUploadFile(option).then(res => {
        const file = {
          fileName : res.fileName,
          fileURL: res.fileUrl
        }
        task_form.requirementDescriptionFileList.push(file)
        console.log(task_form.requirementDescriptionFileList)
      })
    },
    handleUploadSuccess1() {
      console.log("executableFileList:")
    },
    handleUploadSuccess2() {
      console.log("requirementDescriptionFileList")
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