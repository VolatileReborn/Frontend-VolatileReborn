<template>
  <transition name="fade">
    <loading-item v-if="isLoading"/>
  </transition>
  <el-divider></el-divider>
  <RedPackage class="redPacket" />
  <div class="task_container">
      <div v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <div>
            <task-item class="task_item_container"
          v-for="item in currentTaskList"
          v-bind:task="item"
          v-bind:key="item.taskId"
          @click="check_route(item.taskId)"></task-item>
        </div>
        <div style="margin: auto">
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
import {ElMessage} from 'element-plus'
import {browserTasks} from "@/api/square";
import {visitorBrowserTasks} from "@/api/square";
import {ref} from "vue"
import LoadingItem from "@/components/Loading"
import RedPackage from "./RedPackage"

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
      totalPage:ref(1),
      isLoading:true
    }
  },
  mounted(){
    if(this.role === '1'){
      browserTasks().then(res=>{
        if(res.response.code%100 === 0)
        {
          console.log(res.response)
          this.taskList = res.taskList
          this.currentTaskList = this.taskList.slice(0,5)
          this.totalPage = this.taskList.length *2;
          this.isLoading = false
        }
        else {
          ElMessage.error(res.response.message)
        }
      })
    }
   else {
     visitorBrowserTasks().then(res => {
       if(res.response.code % 100 === 0)
       {
         this.taskList = res.taskList
         this.currentTaskList = this.taskList.slice(0,5)
         this.totalPage = this.taskList.length *2;
         this.isLoading = false
       }
       else {
         ElMessage.error(res.response.message)
       }
     })
    }
   setTimeout(()=>{this.isLoading=false},2000)
  },
  components: {
    LoadingItem,
    TaskItem,
    Upload,
    RedPackage
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

.redPacket {
    overflow: hidden;
    position: absolute;
    right: 100px;
    top: 30%;
    z-index: 2;
    animation: shake 2s linear infinite;
  }
  @keyframes shake {
  70%, 80% {
    transform: rotate(7deg);
  }
  75% {
    transform: rotate(-7deg);
  }
  65%,
  85% {
    transform: rotate(0);
  }
}
</style>