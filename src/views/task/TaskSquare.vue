<template>
  <el-divider></el-divider>
<!--  <el-pagination-->
<!--  v-model:currentPage="currentPage"-->
<!--  :page-size="100"-->
<!--  layout="prev,pager,next"-->
<!--  :total="totalPage"-->
<!--  @current-change="handleCurrentChange">-->
<!--    <task-item></task-item>-->
<!--  </el-pagination>-->
  <div class="task_container">
      <div >
        <task-item class="task_item_container"
        v-for="item in taskList"
        v-bind:task="item"
        v-bind:key="item.taskId"
        @click="check_route(item.taskId)"></task-item>
      </div>
  </div>
  <div v-if="role === '0'" class="upload_btn" @click="releaseTask()">
    <el-button type="primary" size="large">
      上传任务<el-icon ><Upload /></el-icon>
    </el-button>
  </div>
</template>

<script>
import TaskItem from "@/components/TaskItem";
import {Upload} from "@element-plus/icons-vue"
import {browserTasks} from "@/api/square";
export default {
  name: "TaskSquare",
  data() {
    return {
      // taskList: [
      //   {taskId: 0,taskName: 'test_task',taskType: 0,workerNumTotal: 10,workerNumLeft: 5,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
      //   {taskId: 1,taskName: 'test_task333',taskType: 1,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
      //   {taskId: 2,taskName: 'test_task5',taskType: 0,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
      //   {taskId: 3,taskName: 'test_task363',taskType: 1,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
      // ],
      taskList:[],
      role:window.localStorage.getItem("role")
    }
  },
  mounted(){
    browserTasks().then(res=>{
      if(res.code === 1)
      {
        console.log(res.msg)
        this.taskList = res.data.taskList
      }
    })
  },
  components: {
    TaskItem,
    Upload
  },
  methods: {
    check_route(taskId){
      this.$router.push("/taskInfoFromSquare/"+taskId);
    },
    releaseTask(){
      this.$router.push("/taskRelease");
    }
  }
}
</script>

<style scoped>
.task_container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-top: -10px;
}
.task_item_container{
  margin-top: 5px;
}
.upload_btn{
  position: absolute;
  right: 20px;
  bottom: 80px;
}
</style>