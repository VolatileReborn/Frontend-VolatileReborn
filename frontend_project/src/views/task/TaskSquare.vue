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
</template>

<script>
import TaskItem from "@/components/TaskItem";
export default {
  name: "TaskSquare",
  data() {
    return {
      taskList: [
        {taskId: 0,taskName: 'test_task',taskType: 0,workerNumTotal: 10,workerNumLeft: 5,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'},
        {taskId: 1,taskName: 'test_task333',taskType: 1,workerNumTotal: 20,workerNumLeft: 6,taskStartTime: '2022-3-1',taskEndTime: '2022-5-3'}
      ]
    }
  },
  components: {
    TaskItem
  },
  methods: {
    check_route(taskId){
      this.$router.push("/taskInfoFromSquare/"+taskId);
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
</style>