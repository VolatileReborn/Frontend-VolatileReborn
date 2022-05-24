<template>
  <transition name="fade">
    <loading-item v-if="isLoading"></loading-item>
  </transition>
  <div class="user-center">
    <el-container>
      <el-container>
        <el-aside width="200px" >
          <el-menu
        default-active="1"
        background-color="#545c64"
        active-text-color="#ffd04b"
        text-color="#fff"
        style="height: 90vh"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <el-menu-item index="0" style="padding-left: 50px">
          <el-icon :size="80"><Menu /></el-icon>
          <span style="font-weight: bolder;font-size: x-large">菜单</span>
        </el-menu-item>
        <el-menu-item index="1">
          <el-icon><location /></el-icon>
          <span>正在进行</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><management /></el-icon>
          <span>历史任务</span>
        </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><promotion /></el-icon>
              <span>报告协作</span>
            </template>
            <el-menu-item index="3-1">
              <span>可协作报告</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <span>我的协作</span>
            </el-menu-item>
          </el-sub-menu>
        <el-menu-item index="4">
          <el-icon><avatar /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
      </el-menu>
        </el-aside>
        <el-main class="main_container">
          <div v-if="key === 3.1">
                <report-item class="task_item_container"
                             v-for="item in reportList"
                             v-bind:report="item"
                             v-bind:key="item.reportId"
                             style="margin-left:50px;margin-top: 5px;width:90%;padding-left: 40px"
                             @click="goReportCooperate(item.taskId,item.reportId)"></report-item>

          </div>
          <div v-if="key === 3.2">
            <report-item class="task_item_container"
                         v-for="item in reportList"
                         v-bind:report="item"
                         v-bind:key="item.reportId"
                         style="margin-left:50px;margin-top: 5px;width:90%;padding-left: 40px"
                         @click="goReportInfoCooperation(item.taskId,item.reportId)"></report-item>
          </div>
         <div v-if="key === 4" >
           <div v-if="change">
           <h5 style="font-family: 幼圆;font-size: x-large;margin-left: 60px">修改个人信息</h5>
           <el-form :model="info_form_change" label-width="120px" label-position="right">
              <el-form-item label="用户名" required>
                <el-input v-model="info_form_change.username" style="width: 200px"></el-input>
              </el-form-item>
             <el-form-item label="专业能力" required>
               <el-input v-model="info_form_change.professionalSkill" style="width:500px" type="textarea"></el-input>
             </el-form-item>
             <el-row>
               <el-col :span="12">
                 <el-form-item label="任务偏好" >
                  <el-select
                      v-model="info_form_change.taskFavorList"
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
               </el-col>
               <el-col :span="12">
                 <el-form-item label="测试设备" >
                   <el-select
                       v-model="info_form_change.devices"
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
               </el-col>
             </el-row>
             <el-row style="justify-content: center">
               <el-col span="24">
                 <el-button type="primary" @click="submitInfo">提交</el-button>
                 <el-button type="primary" plain @click="changeInfo">返回</el-button>
               </el-col>
             </el-row>
             <el-form-item ></el-form-item>
           </el-form>
           </div>
           <div v-else style="display: flex;justify-content: center">
             <el-card class="info_card">
               <template #header>

                 <div style="flex-direction: row;justify-content: center">
                   <el-icon :size="25" color="cadetblue"><User /></el-icon>
                    <span style="font-size: larger;font-weight: bolder;">用户个人信息</span>
                   <el-button plain type="primary" style="margin-left: 600px" @click="changeInfo">修改</el-button>
                 </div>
               </template>
               <el-descriptions column="2" style="font-size: large" size="large">
                 <el-descriptions-item label="用户名">{{info_form.username}}</el-descriptions-item>
                 <el-descriptions-item label="活跃度">
                    <el-progress :percentage="percentage" :color="customColor" style="width: 20vw"/>
                 </el-descriptions-item>
                 <el-descriptions-item label="专业能力">{{info_form.professionalSkill}}</el-descriptions-item>
                 <el-descriptions-item label="任务偏好">
                   <el-tag v-if="info_form.taskFavorList.includes('性能测试')" >性能测试</el-tag>
                   <el-tag v-if="info_form.taskFavorList.includes('功能测试')" type="info" style="margin-left: 5px" >功能测试</el-tag>
                 </el-descriptions-item>
                 <el-descriptions-item label="测试设备">
                    <el-tag v-if="info_form.devices.includes('android')" type="danger" >Android</el-tag>
                   <el-tag v-if="info_form.devices.includes('ios')" type="warning" style="margin-left: 5px" >IOS</el-tag>
                   <el-tag v-if="info_form.devices.includes('linux')" type="success" style="margin-left: 5px" >Linux</el-tag>
                   <el-tag v-if="info_form.devices.includes('windows')" type="primary" style="margin-left: 5px" >Windows</el-tag>
                   <el-tag v-if="info_form.devices.includes('harmonyos')" type="info" style="margin-left: 5px" >HarmonyOS</el-tag>
                 </el-descriptions-item>
               </el-descriptions>
             </el-card>
           </div>
         </div>
          <div v-if="key === 1 || key === 2" >
            <div v-infinite-scroll="load" class="infinite-list" style="overflow:auto;">
              <div>
            <task-item class="task_item_container"
                             v-for="item in currentTaskList"
                             v-bind:task="item"
                             v-bind:key="item.taskId"
                             style="margin-top: 5px;height: 13.5vh;margin-left: 20px"
                             @click="check_route(item.taskId)"></task-item>
              </div>
              <div style="margin: auto;padding-top:10px">
                <el-pagination
                    hide-on-single-page
                    v-model:currentPage="currentPage"
                    background
                    layout="prev,pager,next"
                    v-model:total="totalPage"
                    @current-change="handleCurrentChange"
                >
                </el-pagination>
              </div>
            </div>
              </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {Menu} from "@element-plus/icons-vue"
import {Location} from "@element-plus/icons-vue"
import {Management} from "@element-plus/icons-vue"
import {Avatar} from "@element-plus/icons-vue"
import {Promotion} from "@element-plus/icons-vue"
import {User} from "@element-plus/icons-vue"
import TaskItem from "@/components/TaskItem";
import ReportItem from "@/components/ReportItem";
import {employeeBrowserUndertakingTasks} from "@/api/usercenter";
import {employeeBrowserFinishedTasks} from "@/api/usercenter";
import {getAllCooperation} from "@/api/report";
import {getCooperationList} from "@/api/report";
import {reactive} from "vue";
import {ref} from 'vue'
import {getProfile} from "@/api/user";
import {setProfile} from "@/api/user";
import {ElMessage} from 'element-plus'
import LoadingItem from "@/components/Loading"

const count = ref(0);
const load = () => {
  count.value += 2
}
const info_form = reactive({
  username:'',
  professionalSkill : '',
  taskFavorList:[],
  devices:[]

})
const info_form_change = reactive({
  username: '',
  professionalSkill : '',
  taskFavorList:[],
  activeDegree:0,
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
  name: 'user-center',
  data() {
    return {
      info_form,
      info_form_change,
      taskFavorOptions,
      deviceOptions,
      isCollapse: false,
      breadcrumbItems: ['正在进行'],
      taskList:[],
      currentTaskList:[],
      currentPage:ref(1),
      totalPage:ref(1),
      reportList:[],
      key:1,
      change:false,
      percentage:ref(29),
      customColor:"#f56c6c",
      isLoading:true
    }
  },
  methods: {
    load,
    handleCurrentChange(){
      this.currentTaskList = this.taskList.slice((this.currentPage-1)*5,this.currentPage*5)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath){
        switch(key){
          case '1':
            // this.$router.push('/Page1');
            this.breadcrumbItems  = ['正在进行']
              this.key = 1
            employeeBrowserUndertakingTasks()
                .then(res => {
                  if(res.response.code%100 === 0)
                  {
                    this.taskList = res.undertakingTaskList
                    this.currentTaskList = this.taskList.slice(0,5)
                    this.totalPage = this.taskList.length *2;
                  }
                  else {
                    ElMessage.error(res.response.message)
                  }
                })
            break;
          case '2':
            // this.$router.push('/Page2')
            this.breadcrumbItems  = ['历史任务']
              this.key = 2
              employeeBrowserFinishedTasks()
              .then(res => {
                if(res.response.code%100 === 0)
                {
                  this.taskList = res.finishedTaskList
                  this.currentTaskList = this.taskList.slice(0,5)
                  this.totalPage = this.taskList.length *2;
                }
                else {
                  ElMessage.error(res.response.message)
                }
              })
            break;
          case '3-1':
            this.breadcrumbItems=['可协作报告']
              getAllCooperation().then(res =>{
                if(res.response.code%100 === 0)
                {
                  this.reportList = res.reportList
                }
              }
              
              )
              this.key = 3.1
              break
          case '3-2':
            this.breadcrumbItems=['我的协作']
                this.key = 3.2
              getCooperationList().then(res => {
                if(res.response.code %100 === 0){
                  this.reportList = res.reportList
                }
                else {
                  ElMessage.error(res.response.message)
                }
              })
                break
          case '4':
            this.breadcrumbItems = ['个人信息']
            this.key = 4
              if(!this.change) {
                getProfile().then(res => {
                  if (res.response.code % 100 === 0) {
                    console.log(res.response.message)
                    info_form.username = res.nickname
                    info_form.taskFavorList = res.taskFavorList
                    info_form.devices = res.device.split(", ")
                    info_form.professionalSkill = res.professionalSkill
                    this.percentage = res.activeDegree
                    if(this.percentage<20){
                      this.customColor = "#f56c6c"
                    }
                    else
                      if(this.percentage < 40)
                      {
                        this.customColor = '#e6a23c'
                      }
                      else if(this.percentage < 60)
                      {
                        this.customColor ='#5cb87a'
                      }
                      else
                        if(this.percentage < 80)
                        {
                          this.customColor = '#1989fa'
                        }
                        else
                        {
                          this.customColor = '#6f7ad3'
                        }
                    info_form_change.username = res.nickname
                    info_form_change.taskFavorList = res.taskFavorList
                    info_form_change.devices = res.device.split(", ")
                    info_form_change.professionalSkill = res.professionalSkill
                    info_form_change.activeDegree = res.activeDegree
                  }else {
                    ElMessage.error(res.response.message)
                  }
                })
              }
        }
        console.log(key, keyPath);
      },
    check_route(taskId){
      this.$router.push("/taskInfoFromUser/"+taskId)
      //     .then(()=>{
      //   location.reload()
      // })
    },
    changeInfo(){
      this.change = ! this.change;
    },
    submitInfo(){
      setProfile({professionalSkill:info_form_change.professionalSkill,
        nickname:info_form_change.username,
        taskFavorList:info_form_change.taskFavorList,
        device:info_form_change.devices.join(", ")})
      .then(res => {
        if(res.response.code %100 === 0)
        {
          ElMessage({
            message: "个人信息修改成功",
            type: 'success',
            duration:1000,
            onClose: () =>{
              this.changeInfo()
              getProfile().then(res => {
                if (res.response.code % 100 === 0) {
                  console.log(res.response.message)
                  info_form.username = res.nickname
                  info_form.taskFavorList = res.taskFavorList
                  info_form.devices = res.device.split(", ")
                  info_form.professionalSkill = res.professionalSkill
                }
              else {
                  ElMessage.error(res.response.message)
                }})
            }
          })
        }else{
          ElMessage.error(res.response.message)
        }
      })
    },
    goReportCooperate(taskId,parentId){
      this.$router.push(
          {
            name:"ReportCooperate",
            query:
                {
                  taskId:taskId,
                  reportId:parentId
                }
          }
      )
    },
    goReportInfoCooperation(taskId,reportId){
      this.$router.push({
        name:'ReportInfoCooperation',
        query:{
          taskId:taskId,
          reportId:reportId
        }
      })
    }
  },
  components:{
    LoadingItem,
    Menu,
    Location,
    Management,
    Promotion,
    Avatar,
    User,
    TaskItem,
    ReportItem
  },
  mounted() {
    employeeBrowserUndertakingTasks()
    .then(res => {
      if(res.response.code%100 === 0)
      {
        this.taskList = res.undertakingTaskList
        this.currentTaskList = this.taskList.slice(0,5)
        this.totalPage = this.taskList.length *2;
        this.isLoading = false
      }
      else {
        ElMessage.error(res.response.message)
      }
    })
  }

}
</script>

<style scoped>
.common-layout .el-header {
  background-color: #C1CBD7;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}
.common-layout .el-footer {
  line-height: 60px;
}

.common-layout .el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.common-layout .el-main {
  background-color: lightgray;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

.common-layout > .el-container {
  margin-bottom: 40px;
}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.common-layout .el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.main_container{
  background-color: rgba(220,220,220,0.7);
}
.info_card{
  width:80%
}
.infinite-list{
  height: 83vh;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}
</style>