<template>
  <div class="container">
  <el-card class="box_card">
    <template #header>
      <div class="card_header">
        <span style="font-weight: bolder">个人资料完善</span>
      </div>
    </template>
    <div class="input_container">
      <el-form ref="basicInfo" :model="profile_form" label-width="100px" label-position="right"  class="basicInfo" >
        <el-form-item label="用户名"  required>
          <el-input v-model="profile_form.nickname" style="width: 200px" ></el-input>
        </el-form-item>
        <el-form-item label="专业能力" prop="professionalSkill" required>
          <el-input v-model="profile_form.professionalSkill" :rows="3" type="textarea" ></el-input>
        </el-form-item>
        <el-form-item label="任务偏好" required>
                  <el-select
                      v-model="profile_form.taskFavorList"
                      multiple
                      placeholder="选择你的专业偏好"
                      style="width: 240px">
                    <el-option
                      v-for="item in taskFavorOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                 </el-form-item>
        <el-form-item label="测试设备" required>
                   <el-select
                       v-model="profile_form.devices"
                       multiple
                       placeholder="选择你的测试设备"
                       style="width: 350px">
                     <el-option
                         v-for="item in deviceOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value" />
                   </el-select>
                 </el-form-item>         
        
        <el-form-item style="margin-left: 340px">
          <el-button type="primary" @click="handleSubmit('basicInfo')">提交个人资料</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  </div>
</template>

<script >

import {setProfile} from "@/api/user";
import {reactive} from "vue";
import {ElMessage} from 'element-plus'

const profile_form = reactive({
  nickname: '',
  professionalSkill: '',
  taskFavorList:[],
  devices:[]
})

const taskFavorOptions = [
  {
    value:'功能测试',
    label:'功能测试'
  }
  ,
  {
    value:'性能测试',
    label: '性能测试'
  }
]

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
  },
  {
    value:'windows',
    label:'Windows'
  },
  {
    value:'harmonyos',
    label:'HarmonyOS'
  }
]

export default {
  name: "FillProfile",
  data() {
    return {
      profile_form,
      taskFavorOptions,
      deviceOptions
    }
  },
  components: {},
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(valid =>{
        if (valid){
          
          setProfile({professionalSkill:profile_form.professionalSkill,
                        nickname:profile_form.nickname,
                        taskFavorList:profile_form.taskFavorList,
                        device:profile_form.devices.join(", ")})
              .then(res => {
                if (res.response.code%100 === 0) {
                  // console.log(res.response.message)
                  // console.log(res.task)
                  // this.$router.push("/taskReleaseSucceed")
                  ElMessage({
                    message:'个人资料填写成功',
                    type:'success',
                    duration:1000,
                    onClose:()=>{
                      this.$router.push('/userCenterofEmployee')
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