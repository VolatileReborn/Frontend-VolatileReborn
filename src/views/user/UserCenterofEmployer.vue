<template>
  <transition name="fade">
    <loading-item v-if="isLoading" />
  </transition>
  <div class="user-center">
    <el-container>
<!--      <el-header></el-header>-->
      <el-container>
        <el-aside width="200px" >
<!--          <span style="font-weight:bolder;font-size: larger;margin-left: 25px;font-family: 幼圆,serif">已发布任务</span>-->
          <el-menu
        default-active="3"
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
        <el-menu-item index="3">
          <el-icon><location /></el-icon>
          <span>正在进行</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><management /></el-icon>
          <span>历史任务</span>
        </el-menu-item>
      </el-menu>
        </el-aside>
        <el-main class="main_container">
          <div >
          <task-item class="task_item_container"
                     v-for="item in taskList"
                     v-bind:task="item"
                     v-bind:key="item.taskId"
                     style="margin-top: 5px;height: 13.5vh;margin-left: 20px"
                     @click="check_route(item.taskId)"></task-item>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {Location} from "@element-plus/icons-vue"
import {Management} from "@element-plus/icons-vue"
import {Menu} from "@element-plus/icons-vue"
import {employerBrowserUndertakingTasks} from "@/api/usercenter";
import {employerBrowserFinishedTasks} from "@/api/usercenter";
import TaskItem from "@/components/TaskItem";
import {ElMessage} from "element-plus";
import LoadingItem from "@/components/Loading"
export default {
  name: 'user-center',
  data() {
    return {
      username: '',
      isCollapse: false,
      breadcrumbItems: ['正在进行'],
      taskList:[],
      isLoading:true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath){
        switch(key){
          case '3':
            this.breadcrumbItems  = ['正在进行']
            employerBrowserUndertakingTasks()
                .then(res => {
                  if(res.response.code%100 === 0)
                  {
                    console.log(res)
                    this.taskList = res.undertakingTaskList
                  }
                  else {
                    ElMessage.error(res.response.message)
                  }
                })
            break;
          case '4':
            this.breadcrumbItems  = ['历史任务']
              employerBrowserFinishedTasks()
              .then(res => {
                if(res.response.code%100 === 0)
                {
                  this.taskList = res.finishedTaskList
                }
                else {
                  ElMessage.error(res.response.message)
                }
              })
            break;
          
        }
        console.log(key, keyPath);
      },
    check_route(taskId){
        this.$router.push("/taskInfoFromUser/"+taskId)
        //     .then(()=>{
        //   location.reload()
        // })
    }
    
  },
  components: {
    LoadingItem,
    Menu,
    Location,
    Management,
    TaskItem
  },
  mounted() {
      employerBrowserUndertakingTasks()
    .then(res => {
      if(res.response.code%100 === 0)
      {

        this.taskList = res.undertakingTaskList
        this.isLoading = false

      }
      else
      {
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
</style>