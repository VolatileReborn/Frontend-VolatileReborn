<!-- Todo: 删除任务 -->
<template>
  <el-card :body-style="{padding: '0px'}" class="task_card">
    <el-row>
      <img v-if="task.taskType===0" src="../assets/functional_test.png">
      <img v-if="task.taskType === 1" src="../assets/performance_test.png">
      <div class="task_container">
        <div class="task_container_1">
          <div class="task_name">{{task.taskName}}</div>
          <div class="task_type">
            <el-tag v-if="task.taskType === 0" >功能测试</el-tag>
            <el-tag v-if="task.taskType === 1" type="success">性能测试</el-tag>
          </div>
        </div>
        <div class="task_container_2">
          <el-row class="task_happen_time">
            <el-col :span="30">{{ parseTime(task.taskStartTime,"{y}-{m}-{d}") }} - {{ parseTime(task.taskEndTime,"{y}-{m}-{d}")}}</el-col>
            <el-col :span="30" style="padding-left: 20px">
             <!-- 删除按钮 -->
          <el-button class="display: inline-block;" type="danger" size="mini" @click="deleteTask(task.taskId, $event)">删除</el-button>
            </el-col>
          </el-row>
          <div>
            <el-row class="task_info" justify="end" >
              <el-col :span="6"  class="task_info_item">招聘 <span style="font-weight: bold;color:#409efc ">{{task.workerNumTotal}}</span> 人</el-col>
              <el-col :span="8"  class="task_info_item">剩余 <span style="font-weight: bold;color:#409efc ">{{task.workerNumLeft}}</span> 名额</el-col>
            <el-col :span="10"  class="task_info_item">发布于 {{parseTime(task.taskStartTime,"{y}-{m}-{d}")}}</el-col>
          </el-row>
          </div>
        </div>
      </div>
    </el-row>
  </el-card>
</template>

<script>
import {parseTime} from "@/utils/utils";
export default {
  name: "TaskItem",
  props: ["task"],
  methods:{
    parseTime,
    deleteTask(taskId, event){
      // 阻止事件冒泡
      event.stopPropagation();
      console.log(taskId)
    }
  }
}
</script>

<style scoped>
.task_card{
  height: 14vh;
  width: 80vw;
  margin-left: 10%;
  display: flex;
  align-items: center;
  background-color: white;
  opacity: 1;
}
img{
  height: 13vh;
  width: 13vh;
  margin-left: 20px;
}
.task_container{
  display: flex;
  flex-direction: row;
  width: 920px;
  padding-left: 14px;
  padding-top: 14px;
  padding-bottom: 14px;
}
.task_container_1{
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 20px;

}
.task_name{
  font-size: larger;
  font-weight: bold;
  font-family: 幼圆;
  margin-top: -10px;
}
.task_type{
  margin-top: 15px;
}
.task_container_2{
  display: flex;
  flex-direction: row;
  position:absolute;
  right: 0;
  height: 100%;
  width: 400px;
  margin-top: -15px;

}

.task_happen_time{
  position: absolute;
  right: 22px;
  margin-top: 25px;
  color: gray;
}
.task_info{
  position: absolute;
  bottom: 0;
  width: 400px;
}
.task_info_item{
  text-align: center;
}
</style>