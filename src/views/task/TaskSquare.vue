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
      <div v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <div>
            <task-item class="task_item_container"
          v-for="item in currentTaskList"
          v-bind:task="item"
          v-bind:key="item.taskId"
          @click="check_route(item.taskId)"></task-item>
        </div>
        <div style="margin: auto;padding-top:5px">
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
import {ref} from "vue"
const count = ref(0);
const load = () => {
  count.value += 2
}
export default {
  name: "TaskSquare",
  data() {
    return {
      taskList:[],
      currentTaskList:[],
      role:window.localStorage.getItem("role"),
      currentPage:ref(1),
      totalPage:ref(1)
    }
  },
  mounted(){
    browserTasks().then(res=>{
      if(res.response.code === 0)
      {
        console.log(res.response)
        this.taskList = res.taskList
        this.currentTaskList = this.taskList.slice(0,5)
        this.totalPage = this.taskList.length *2;
        // console.log(this.taskList)
      }
    })
  },
  components: {
    TaskItem,
    Upload
  },
  methods: {
    load,
    check_route(taskId){
      this.$router.push("/taskInfoFromSquare/"+taskId);
    },
    releaseTask(){
      this.$router.push("/taskRelease");
    },
    handleCurrentChange(){
        this.currentTaskList = this.taskList.slice((this.currentPage-1)*5,this.currentPage*5)
    }
  }
}
</script>

<style scoped>
.task_container{
  width:  100vw;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  /*margin-top: -10px;*/
  height: 80vh;
  margin-top: auto
}
.task_item_container{
  margin-top: 3px;
}
.infinite-list{
  height: 80vh;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}
.upload_btn{
  position: absolute;
  right: 20px;
  bottom: 80px;
  background-color: #42b983;
}
</style>