<template>
  <div class="user-center">
   
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="200px" >
<!--          <span style="font-weight:bolder;font-size: larger;margin-left: 25px;font-family: 幼圆,serif">已发布任务</span>-->
          <el-menu
        default-active="3"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
          >
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
        <div>
        <el-main style="display: flex;flex-direction: column;text-align: center;width:85vw">
          <div style="margin-top: -20px">
          <task-item class="task_item_container"
                     v-for="item in taskList"
                     v-bind:task="item"
                     v-bind:key="item.taskId"
                     style="margin-left:5px;margin-top: 5px"
                     @click="check_route(item.taskId)"></task-item>
          </div>
        </el-main>
        </div>
      </el-container>
    </el-container>

    
  </div>
</template>

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
</style>


<script>
import {Location} from "@element-plus/icons-vue"
import {Management} from "@element-plus/icons-vue"
import {employerBrowserUndertakingTasks} from "@/api/usercenter";
import {employerBrowserFinishedTasks} from "@/api/usercenter";
import TaskItem from "@/components/TaskItem";
export default {
  name: 'user-center',
  data() {
    return {
      username: '',
      isCollapse: false,
      breadcrumbItems: ['正在进行'],
      taskList:[]
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
              })
            break;
          
        }
        console.log(key, keyPath);
      },
    check_route(taskId){
        this.$router.push("/taskInfoFromUser/"+taskId)
    }
    
  },
  components: {
    Location,
    Management,
    TaskItem
  },
  mounted() {
      employerBrowserUndertakingTasks()
    .then(res => {
      if(res.response.code%100 === 0)
      {
        console.log(res.response.message)
        this.taskList = res.undertakingTaskList
        console.log(res.taskList)
      }
    })
  }

}
</script>
