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
                         style="margin-top: 5px;height: 13.5vh;margin-left: 20px"
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
              <h5 style="font-family: 幼圆;font-size: x-large;margin-left: 60px">设置众测任务推荐规则</h5>
              <el-form
                  :model="recommendRule"
                  style="margin-left: 60px;width: 800px;"
                  label-position="right"
                  ref="recommendInfo"
                  :rules="recommendFormRules">
                <el-form-item  label="任务特性" prop="emphasized_task_features"  inline-message>
                <el-row :gutter="20">
                    <el-col :span="2" >参考</el-col>
                    <el-col :span="10">
                      <el-select
                          v-model="recommendRule.emphasized_task_features"
                          multiple
                          placeholder="选择推荐任务时参考的任务特性"
                          style="width: 240px">
                        <el-option
                          v-for="item in taskFeatures"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="2" >忽略</el-col>
                    <el-col :span="10">
                      <el-select
                          v-model="recommendRule.desalted_task_features"
                          multiple
                          placeholder="选择推荐任务时忽略的任务特性"
                          style="width: 240px">
                        <el-option
                            v-for="item in taskFeatures"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                      </el-select>
                    </el-col>
                </el-row>
                </el-form-item>
                <el-form-item  label="工人特性" prop="emphasized_user_features" >
                <el-row :gutter="20">
                    <el-col :span="2">参考</el-col>
                    <el-col :span="10">
                      <el-select
                          v-model="recommendRule.emphasized_user_features"
                          multiple
                          placeholder="选择推荐任务时参考的工人特性"
                          style="width: 240px">
                        <el-option
                            v-for="item in userFeatures"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                      </el-select>
                  </el-col>
                    <el-col :span="2">忽略</el-col>
                  <el-col :span="10">
                      <el-select
                          v-model="recommendRule.desalted_user_features"
                          multiple
                          placeholder="选择推荐任务时忽略的工人特性"
                          style="width: 240px">
                        <el-option
                            v-for="item in userFeatures"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"></el-option>
                      </el-select>
                  </el-col>
                </el-row>
                </el-form-item>
                <el-form-item >
                  <el-button type="primary" @click="submitRule">修改</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-divider />
            <div style="margin-left:60px;display: flex;flex-direction: row;">
              <div style="margin-right: 10px;">报告相似度算法</div>
              <el-select
                v-model="algorithm"
                style="width: 240px">
                <el-option
                  v-for="item in algorithmOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"></el-option>
              </el-select>
              <el-button @click="submitAlgorithm" style="margin-left: 20px;">修改</el-button>
            </div>
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
import {getRecommendRule} from "@/api/usercenter";
import {adminGetAlgorithm} from "@/api/usercenter";
import {adminSetAlgorithm} from "@/api/usercenter";
import TaskItem from "@/components/TaskItem";
import {reactive} from "vue"
import {ref} from "vue"
import {ElMessage} from "element-plus";
const count = ref(0);
const load = () => {
  count.value += 2
}
const recommendRule = reactive({
  emphasized_user_features:[],
  desalted_user_features:[],
  emphasized_task_features:[],
  desalted_task_features:[]
})
const validUser = function (rule,value,callback) {
  recommendRule.emphasized_user_features.forEach(item => {
    if(recommendRule.desalted_user_features.includes(item)) {
      console.log('error!')
      callback(new Error('参考的用户特性和忽视的用户特性不能重复'))

    }
  })
  callback()
}
const validTask = function (rule,value,callback) {
  recommendRule.emphasized_task_features.forEach(item => {
    if(recommendRule.desalted_task_features.includes(item)) {
      console.log('error!')
      callback(new Error('参考的任务特性和忽视的任务特性不能重复'))
    }
  })
  callback()
}
const recommendFormRules = reactive({
  emphasized_user_features:[
    {
      validator:validUser,
      trigger:'change'
    }
  ],
  emphasized_task_features:[
    {
      validator:validTask,
      trigger:'change'
    }
  ]

})
const taskFeatures = [
  {
    value:'任务难度',
    label:'任务难度'
  },
  {
    value:'设备类型',
    label: '设备类型'
  },
  {
    value:'测试设备需求',
    label:'测试设备需求'
  }
]
const userFeatures = [
  {
      value:'专业能力',
      label:'专业能力'
  },
  {
    value:'任务偏好',
    label:'任务偏好'
  },
  {
    value:'活跃度',
    label:'活跃度'
  },
  {
    value:'测试设备',
    label:'测试设备'
  }
]

const algorithm = reactive({
  rule:''
})
const algorithmOptions = [
  {
    value:'CosineSimilarity',
    label:'CosineSimilarity'
  },
  {
    value:'SemanticSearch',
    label:'SemanticSearch'
  },
  {
    value:'BM25',
    label:'BM25'
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
      currentPage:ref(1),
      totalPage:ref(1),
      recommendRule,
      taskFeatures,
      userFeatures,
      recommendFormRules,
      algorithm,
      algorithmOptions
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
            else {
              ElMessage.error(res.response.message)
            }
          })
            this.key = 1
          break;
        case '2':
          this.breadcrumbItems  = ['系统设置']
          this.key = 2
          getRecommendRule().then(res => {
            if(res.response.code %100 === 0)
            {
              recommendRule.desalted_task_features = res.recommendation_rules.desalted_task_features
              recommendRule.desalted_user_features = res.recommendation_rules.desalted_user_features
              recommendRule.emphasized_task_features = res.recommendation_rules.emphasized_task_features
              recommendRule.emphasized_user_features = res.recommendation_rules.emphasized_user_features
            }
            else {
              ElMessage.error(res.response.message)
            }
          })
          adminGetAlgorithm().then(res =>{
            if(res.response.code %100 === 0)
            {
              algorithm.rule = res.rule
            }
            else {
              ElMessage.error(res.response.message)
            }
          })
          break;

      }
      console.log(key, keyPath);
    },
    check_route(taskId){
      this.$router.push("/taskInfoFromUser/"+taskId).then(()=>{
        location.reload()
      })
    },

    handleCurrentChange(){
      this.currentTaskList = this.taskList.slice((this.currentPage-1)*5,this.currentPage*5)
    },
    submitRule() {
      this.$refs['recommendInfo'].validate(valid => {
        if (valid) {
            setRecommendRule({ desalted_task_features : recommendRule.desalted_task_features,
              desalted_user_features :recommendRule.desalted_user_features,
              emphasized_task_features :recommendRule.emphasized_task_features,
              emphasized_user_features :recommendRule.emphasized_user_features})
          .then(res => {
            if(res.response.code %100 === 0)
            {
              ElMessage.success(res.response.message)
            }
            else
            {
              ElMessage.error(res.response.message)
            }
              }
          )
        } else {
          ElMessage.error('请正确修改')
        }
      })
    },
    submitAlgorithm(){
      if(algorithm.rule !== '')
      {
        adminSetAlgorithm({rule:algorithm.rule})
        .then(res => {
          if(res.response.code %100 === 0 )
          {
            ElMessage.success(res.response.message)
          }
          else {
            ElMessage.error(res.response.message)
          }
        })
      }
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
      else {
        ElMessage.error(res.response.message)
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
  height: 83vh;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}
</style>
