<template>
  <el-divider></el-divider>

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
import {employerBrowserUndertakingTasks} from "@/api/usercenter"; //这里添加任务接口

export default {
  name: "employerBrowserUndertakingTasks",
  data() {
    return {

      taskList:[],
      role:window.localStorage.getItem("role")
    }
  },
  mounted(){//这里也要用到任务接口
    employerBrowserUndertakingTasks({token:window.localStorage.getItem("token")}).then(res=>{
      if(res.code === 1)
      {
        console.log(res.msg)
        this.taskList = res.data.taskList
      }
    })
  },
  components: {
    TaskItem
    
  },
  methods: {
    check_route(taskId){
      this.$router.push("/taskInfoFromUser/"+taskId);
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