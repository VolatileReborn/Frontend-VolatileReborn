<template>
  <div class="user-center">
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="200px" >
          <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >       
        <el-menu-item index="1">
          <el-icon><location /></el-icon>
          <span>正在进行</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><management /></el-icon>
          <span>历史任务</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><management /></el-icon>
          <span>个人信息</span>
        </el-menu-item>
      </el-menu>
        </el-aside>
        <el-main>
         <div v-if="key === 3">个人信息设置</div>
          <task-item v-else class="task_item_container"
                             v-for="item in taskList"
                             v-bind:task="item"
                             v-bind:key="item.taskId"
                             style="width:100%;margin-left:-20px"
                             @click="check_route(item.taskId)"></task-item>
        </el-main>
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
import TaskItem from "@/components/TaskItem";
import {employeeBrowserUndertakingTasks} from "@/api/usercenter";
import {employeeBrowserFinishedTasks} from "@/api/usercenter";
export default {
  name: 'user-center',
  data() {
    return {
      username: '',
      isCollapse: false,
      breadcrumbItems: ['正在进行'],
      taskList:[],
      key:1
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
          case '1':
            // this.$router.push('/Page1');
            this.breadcrumbItems  = ['正在进行']
              this.key = 1
            employeeBrowserUndertakingTasks({token:window.localStorage.getItem("token")})
                .then(res => {
                  if(res.response.code === 0)
                  {
                    this.taskList = res.undertakingTaskList
                  }
                })
            break;
          case '2':
            // this.$router.push('/Page2')
            this.breadcrumbItems  = ['历史任务']
              this.key = 2
              employeeBrowserFinishedTasks({token:window.localStorage.getItem("token")})
              .then(res => {
                if(res.response.code === 0)
                {
                  this.taskList = res.finishedTaskList
                }
              })
            break;
          case '3':
            this.breadcrumbItems = ['个人信息']
                this.key = 3

        }
        console.log(key, keyPath);
      },
    check_route(taskId){
      this.$router.push("/taskInfoFromUser/"+taskId)
    }
  },
  components:{
    Location,
    Management,
    TaskItem
  },
  mounted() {
    employeeBrowserUndertakingTasks({token:window.localStorage.getItem("token")})
    .then(res => {
      if(res.response.code === 0)
      {
        this.taskList = res.undertakingTaskList
      }
    })
  }

}
</script>
