<template>
  <div class="user-center">

    <el-container>
      <el-container>
        <el-aside width="200px" >
          <el-menu
              default-active="1"
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
            <el-menu-item index="1">
              <el-icon><location /></el-icon>
              <span>所有任务</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><management /></el-icon>
              <span>系统设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main_container">
          <div v-if="key === 1">
            <div v-infinite-scroll="load" class="infinite-list" style="overflow:auto;">
              <div>
              <task-item class="task_item_container"
                         v-for="item in currentTaskList"
                         v-bind:task="item"
                         v-bind:key="item.taskId"
                         style="margin-left:50px;margin-top: 5px;width:90%;padding-left: 40px"
                         @click="check_route(item.taskId)"></task-item>
              </div>
              <div style="margin: auto;padding-top:10px">
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
          <div v-if="key === 2">
            <div >
              <h5 style="font-family: 幼圆;font-size: x-large;margin-left: 60px">修改系统设置</h5>
              <el-form :model="system_form_change" label-width="150px" label-position="right" >
                <el-row >
                  <el-col :span="24">
                    <el-form-item label="众测任务推荐规则" >
                      <el-select
                          v-model="system_form_change.recommendRule"
                          placeholder="选择系统的众测任务推荐规则"
                          style="width: 240px">
                        <el-option
                            v-for="item in recommendRuleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  </el-row>
                <el-row>
                  <el-col span="24">
                    <el-form-item label="报告相似度计算算法" >
                      <el-select
                          v-model="system_form_change.similarityRule"
                          placeholder="选择系统的报告相似度计算算法"
                          style="width: 240px">
                        <el-option
                            v-for="item in similarityRuleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col span="24">
                    <el-button type="primary" @click="submitInfo" style="margin-left: 200px">提交</el-button>
<!--                    <el-button type="primary" plain @click="changeInfo">返回</el-button>-->
                  </el-col>
                </el-row>
                <el-form-item ></el-form-item>
              </el-form>
            </div>
<!--            <div v-else style="display: flex;justify-content: center">-->
<!--              <el-card class="info_card">-->
<!--                <template #header>-->
<!--                  <el-icon :size="25" color="cadetblue"><Management /></el-icon>-->
<!--                  <span style="font-size: larger;font-weight: bolder">系统信息设置</span>-->
<!--                  <el-button plain type="primary" style="margin-left: 700px" @click="changeInfo">修改</el-button>-->
<!--                </template>-->
<!--                <el-descriptions column="1" style="font-size: large" size="large">-->
<!--                  <el-descriptions-item label="众测任务推荐规则：">{{system_form.recommendRule}}</el-descriptions-item>-->
<!--                  <el-descriptions-item label="报告相似度计算规则：">{{system_form.similarityRule}}</el-descriptions-item>-->
<!--                </el-descriptions>-->
<!--              </el-card>-->
<!--            </div>-->
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
import {Location} from "@element-plus/icons-vue"
import {Menu} from "@element-plus/icons-vue"
import {Management} from "@element-plus/icons-vue"
import {adminBrowserAllTasks} from "@/api/usercenter";
import {setRecommendRule} from "@/api/usercenter";
import TaskItem from "@/components/TaskItem";
import {reactive} from "vue"
import {ref} from "vue"
const count = ref(0);
const load = () => {
  count.value += 2
}

const system_form_change = reactive({
  recommendRule:'基于用户偏好进行推荐',
  similarityRule:'基于文字信息'
})

const recommendRuleOptions = [
  {
    value:'基于用户偏好进行选择',
    label:'基于用户偏好进行选择'
  },
  {
    value:'基于用户专业技能进行选择',
    label:'基于用户专业技能进行选择'
  }
]

const similarityRuleOptions = [
  {
    value:'基于文字信息',
    label:'基于文字信息'
  },
  {
    value:'基于图片信息',
    label:'基于图片信息'
  }
]
export default {
  name: 'UserCenterOfManager',
  data() {
    return {
      username: '',
      isCollapse: false,
      breadcrumbItems: ['所有任务'],
      key:1,
      taskList:[],
      currentTaskList:[],
      // change:false,
      // system_form,
      system_form_change,
      recommendRuleOptions,
      similarityRuleOptions,
      currentPage:ref(1),
      totalPage:ref(1)
    }
  },
  methods: {
    load,
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath){
      switch(key){
        case '1':
          this.breadcrumbItems  = ['所有任务']
          adminBrowserAllTasks().then(res =>{
            if(res.response.code%100 === 0)
            {
              this.taskList = res.taskList
              this.currentTaskList = this.taskList.slice(0,5)
              this.totalPage = this.taskList.length *2;
            }
          })
            this.key = 1
          break;
        case '2':
          this.breadcrumbItems  = ['系统设置']
          this.key = 2
          break;

      }
      console.log(key, keyPath);
    },
    check_route(taskId){
      this.$router.push("/taskInfoFromUser/"+taskId)
    },
    // changeInfo(){
    //   this.change = ! this.change;
    // },
    submitInfo(){
      setRecommendRule({rule:system_form_change.recommendRule})
    },
    handleCurrentChange(){
      this.currentTaskList = this.taskList.slice((this.currentPage-1)*5,this.currentPage*5)
    }
  },
  components: {
    Location,
    Menu,
    Management,
    TaskItem
  },
  mounted() {
    adminBrowserAllTasks().then(res =>{
      if(res.response.code%100 === 0)
      {
        this.taskList = res.taskList
        this.currentTaskList = this.taskList.slice(0,5)
        this.totalPage = this.taskList.length *2;
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
.infinite-list{
  height: 82vh;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}
</style>
