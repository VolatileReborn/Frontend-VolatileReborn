<template>
  <transition name="fade">
    <loading-item v-if="isLoading" />
  </transition>
  <div class="user-center">
    <el-container>
      <!--      <el-header></el-header>-->
      <el-container>
        <el-aside width="200px">
          <!--          <span style="font-weight:bolder;font-size: larger;margin-left: 25px;font-family: 幼圆,serif">已发布任务</span>-->
          <el-menu
            default-active="1-1"
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
              <span style="font-weight: bolder; font-size: x-large">菜单</span>
            </el-menu-item>
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>非复合任务</span>
              </template>
              <el-menu-item index="1-1">
                <el-icon><location /></el-icon>
                <span>正在进行</span>
              </el-menu-item>
              <el-menu-item index="1-2">
                <el-icon><management /></el-icon>
                <span>历史任务</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon><location /></el-icon>
              <span>复合任务</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main_container">
          <div v-if="!isCompose">
            <task-item
              class="task_item_container"
              v-for="item in taskList"
              v-bind:task="item"
              v-bind:key="item.taskId"
              style="margin-top: 5px; height: 13.5vh; margin-left: 20px"
              @click="check_route(item.taskId)"
            ></task-item>
          </div>
          <div v-if="isCompose">
            <el-table :data="taskList">
              <el-table-column type="expand">
                <template #default="scope">
                  <task-item
                    class="task_item_container"
                    v-for="item in scope.row.subTasks"
                    v-bind:task="item"
                    v-bind:key="item.taskId"
                    style="margin-top: 5px; height: 13.5vh; margin-left: 20px"
                    @click="check_route(item.taskId)"
                  ></task-item>
                </template>
              </el-table-column>
              <el-table-column label="任务名称" prop="taskName"></el-table-column>
              <el-table-column label="任务发布时间" prop="publishTime"></el-table-column>
              <el-table-column label="任务状态">
                <template #default="scope">
                  <el-icon v-if="scope.row.state=='COMPLETED'"><Check /></el-icon>
                  <el-icon v-else><Close /></el-icon>
                </template>
              </el-table-column>
              
            </el-table>
            <page :goPage="goPage" :pageAll="pageAll"></page>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Location } from "@element-plus/icons-vue";
import { Management } from "@element-plus/icons-vue";
import { Menu } from "@element-plus/icons-vue";
import { Check } from "@element-plus/icons-vue";
import { Close } from "@element-plus/icons-vue";
import {
  employerBrowserUndertakingTasks,
  employerBrowserFinishedTasks,
  employerBrowserCompositeTasks,
} from "@/api/usercenter";
import TaskItem from "@/components/TaskItem";
import { ElMessage } from "element-plus";
import LoadingItem from "@/components/Loading";
import Page from "../../components/Page.vue";
export default {
  name: "user-center",
  inject: ["reload"],
  data() {
    return {
      username: "",
      isCollapse: false,
      breadcrumbItems: ["正在进行"],
      taskList: [],
      isLoading: true,
      role: window.localStorage.getItem("role"),
      isCompose: false,
      pageAll: 10,
      pageSize: 15,
      page: 1,
    };
  },
  methods: {
    goPage(page) {
      this.getComposeTasks(page, this.pageSize);
    },
    getComposeTasks(page, pageSize) {
          this.isCompose = true;
      console.log({page,pageSize});
      employerBrowserCompositeTasks({ pageNum: page, pageSize: pageSize }).then((res) => {
        if (res.response.code % 100 === 0) {
          console.log(res);
          this.taskList = res.compositeTaskStateList;
          this.isCompose = true;
        } else {
          ElMessage.error(res.response.message);
        }
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      switch (key) {
        case "1-1":
          this.breadcrumbItems = ["正在进行"];
          employerBrowserUndertakingTasks().then((res) => {
            if (res.response.code % 100 === 0) {
              console.log(res);
              this.taskList = res.undertakingTaskList;
              this.isCompose = false;
              this.pageAll = Math.ceil(res.currSumSize / this.pageSize);
            } else {
              ElMessage.error(res.response.message);
            }
          });
          break;
        case "1-2":
          this.breadcrumbItems = ["历史任务"];
          employerBrowserFinishedTasks().then((res) => {
            if (res.response.code % 100 === 0) {
              this.taskList = res.finishedTaskList;
              this.isCompose = false;
            } else {
              ElMessage.error(res.response.message);
            }
          });
          break;
        case "2":
          this.getComposeTasks(1, this.pageSize);
          break;
      }
      console.log(key, keyPath);
    },
    check_route(taskId) {
      this.$router.push("/taskInfoFromUser/" + taskId);
      //     .then(()=>{
      //   location.reload()
      // })
    },
  },
  components: {
    LoadingItem,
    Check,
    Close,
    Menu,
    Location,
    Management,
    TaskItem,
    Page,
  },
  mounted() {
    if (this.role === undefined || this.role !== "0") {
      this.isLoading = false;
      ElMessage.info("请重新登陆");
      this.$router.push("/login");
    } else {
      employerBrowserUndertakingTasks().then((res) => {
        if (res.response.code % 100 === 0) {
          this.taskList = res.undertakingTaskList;
          this.isLoading = false;
        } else {
          if (res.response.code === 1) {
            ElMessage({
              type: "error",
              message: res.response.message,
              onClose: () => {
                window.localStorage.clear();
                this.$router.push("/login");
                this.reload();
              },
            });
          } else {
            ElMessage.error(res.response.message);
          }
        }
      });
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
};
</script>
<style scoped>
.common-layout .el-header {
  background-color: #c1cbd7;
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
.main_container {
  background-color: rgba(220, 220, 220, 0.7);
}
</style>