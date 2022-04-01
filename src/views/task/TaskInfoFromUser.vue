<template>
  <el-divider></el-divider>
  <el-breadcrumb separator="/"  class="breadcrumb">
    <el-breadcrumb-item @click="go_route"><strong>个人中心</strong></el-breadcrumb-item>
    <el-breadcrumb-item>任务详情</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="container" v-infinite-scroll="load" style="overflow: auto">
    <el-card class="box_card">
      <template #header>
        <div class="card_header">
          <div class="header_left">
            <span style="font-size: larger">{{task.taskName}}</span>
            <div class="header_tags">
              <el-tag class="header_tag" type="warning">进行中</el-tag>
              <el-tag v-if="task.taskType === 0" style="margin-left: 10px">功能测试</el-tag>
              <el-tag v-if="task.taskType === 1" style="margin-left: 10px" type="success">性能测试</el-tag>
            </div>
          </div>
          <div class="header_right">
            <div style="font-size: small">紧急程度：<el-rate v-model="task.taskUrgency"
                                                        show-text
                                                        :texts="['非常宽松','宽松','一般紧急','紧急','非常紧急']"
                                                        :colors="['#67c23a','#FF9900','#ff0000']"
                                                        disabled/>
            </div>
            <div style="font-size: small">任务难度：<el-rate v-model="task.taskDifficulty"
                                                        show-text
                                                        :texts="['轻松','容易','一般','较难','困难']"
                                                        :colors="['#67c23a','#FF9900','#ff0000']"
                                                        disabled/>
            </div>
          </div>
        </div>
      </template>
      <div class="information">
        <div>发布日期 ： {{ parseTime(task.taskStartTime)}}</div>
        <div style="margin-top: 5px">结束日期 ： {{parseTime(task.taskEndTime)}}</div>
        <div style="margin-top: 5px">参与人员 ： 剩余 <span style="font-weight: bold;color:#409efc ">{{task.workerNumLeft}}</span>  人  <el-divider direction="vertical" ></el-divider>  总需  <span style="font-weight: bold;color:#409efc ">{{task.workerNumTotal}}</span> 人</div>
      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">需求描述</div>
        </div>
        <div style="margin-top: 10px">任务简介 ： <span style="font-weight: bold">{{task.taskIntroduction}}</span></div>
        <div style="margin-top: 10px;display: flex;flex-direction: row">
          <span style="padding-top: 10px">测试设备需求：</span>
          <div style="flex-direction: column;justify-content: center" v-if="task.android === true">
            <el-image class="device_img"  :src="require('../../assets/Android.png')"></el-image>
            <div>Android</div>
          </div>
          <div style="flex-direction: column;justify-content: center" v-if="task.ios === true">
            <el-image class="device_img"  :src="require('../../assets/iOS.png')"></el-image>
            <div style="padding-left: 18px">iOS</div>
          </div>
          <div style="flex-direction: column;justify-content: center" v-if="task.linux === true">
            <el-image class="device_img"  :src="require('../../assets/Linux.png')"></el-image>
            <div style="padding-left: 10px">Linux</div>
          </div>
          <div style="flex-direction: column;justify-content: center" v-if="task.windows === true">
            <el-image class="device_img" style="padding-left: 25px"  :src="require('../../assets/Windows.png')"></el-image>
            <div style="padding-left: 10px">Windows</div>
          </div>
          <div style="flex-direction: column;justify-content: center" v-if="task.harmonyos === true">
            <el-image class="device_img"   :src="require('../../assets/Harmony.jpg')"></el-image>
            <div style="padding-left: 25px">鸿蒙</div>
          </div>
        </div>
      </div>
      <div class="file_information" >
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <folder-checked />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">附件下载</div>
        </div>
          <div style="display: flex;flex-direction: row">
<!--          <a :href="exeUrl" download="待测应用可执行文件">-->
            <el-button type="text" @click="downloadExe">一、点击下载待测应用可执行文件</el-button>
<!--          </a>-->
<!--            <a :href="docUrl" download="测试需求描述文件" style="margin-left: 10px">-->
          <el-button type="text" @click="downloadDoc">二、点击下载测试需求描述文件</el-button>
<!--            </a>-->
            <div v-if="this.role === '0'">
              <el-button v-if="task.taskState === 0" type="danger" round style="margin-left: 600px" size="large" @click="finish()" >结束任务</el-button>
            </div>
          </div>
      </div>
      <div v-if="role === '1'" style="position: relative;margin-left: 1000px" >
        <el-button  v-if="task.isSubmitted === 0" type="danger"  @click="goRelease">提交报告</el-button>
        <el-button  v-if="task.isSubmitted === 1" type="primary"  @click="goMyReportInfo">我的报告</el-button>
      </div>
      </div>
      <el-divider ><el-icon><star-filled /></el-icon></el-divider>
      <div class="report_container" >
        <el-row>
          <el-col :span="15"><span style="font-weight: bolder">报告展示</span></el-col>
          <el-col :span="5">
          </el-col>
        </el-row>
        <el-table :data="task.reportList"
                  height="250"
                  style="width:100%;margin-top: 10px;text-align: center"
                  stripe
                  border
                  size="large"
                  highlight-current-row
                  type-layout="auto">
          <el-table-column type="index" width="100" align="center" />
          <el-table-column prop="reportId" label="报告ID"  align="center"/>
          <el-table-column label="测试工人ID" align="center" >
            <template #default="scope">
              <div style="display: flex;align-items: center;justify-content: center">
                <el-icon><Avatar /></el-icon>
                <span style="margin-left: 10px;">{{scope.row.workerId}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
            <el-button size="small" type="primary" @click="goReport(scope.row.reportId)">查看报告</el-button>
            </template>
          </el-table-column>
        </el-table>
      <div class="relation_container" id="my_graph">

      </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {FolderChecked} from "@element-plus/icons-vue"
import {Edit} from "@element-plus/icons-vue"
import {StarFilled} from "@element-plus/icons-vue"
import {Avatar} from "@element-plus/icons-vue"
import {employerBrowserTaskDetail} from "@/api/task";
import {employeeBrowserTaskDetail} from "@/api/task";
import {adminGetTaskDetail} from "@/api/usercenter";
import {browserReports} from "@/api/report";
import {browserChecked} from "@/api/usercenter";
import oss from "@/utils/oss"
import {parseTime} from "@/utils/utils";
import {ref} from "vue"
import {ElMessage} from "element-plus";
import * as echarts from 'echarts'
import axios from "axios";


const count = ref(0);
const load = () => {
  count.value += 2
}
export default {
  name: "TaskInfoFromUser",
  data() {
    return {
      taskId: this.$route.params.taskId,
      task: {
        taskId: this.taskId,
        taskName: '',
        taskType: 0,
        workerNumTotal: 0,
        workerNumLeft: 0,
        taskStartTime: 0,
        taskEndTime: 0,
        taskState: ref(),
        taskUrgency:0,
        taskDifficulty:2,
        android:false,
        ios:false,
        linux:false,
        windows:false,
        harmonyos:false,
        taskIntroduction: '',
        requirementDescriptionFileList:[],
        executableFileList:[],
        is_selected: false,
        reportList:[
        ],
        isSubmitted:ref(),
        reportId:0
      },
      isAble: true,
      role:window.localStorage.getItem("role"),
      exeUrl:'',
      exeName:'',
      docUrl:'',
      docName:''
    }
  },
  components: {
    FolderChecked,
    Edit,
    StarFilled,
    Avatar
    // ReportItem
  },
  methods: {
    load,
    parseTime,
    go_route(){
      if(this.role === '0')
      {
        this.$router.push("/userCenterofEmployer")
      }
      if(this.role === '1')
      {
        this.$router.push("/userCenterofEmployee")
      }
      if(this.role === '2')
      {
        this.$router.push("/userCenterOfManager")
      }
    },
    downloadExe(){
      console.log('开始下载')
      console.log(this.task.executableFileList)
      this.task.executableFileList.forEach(item => {
        oss.ossGetDownloadUrl(item.fileURL.substr(49))
            .then( res => {
              const url = res.downloadURL
              console.log(url)
              const iframe = document.createElement("iframe")
              iframe.style.display = "none"
              iframe.style.height=0
              iframe.src=url
              document.body.appendChild(iframe)
              setTimeout(() => {
                iframe.remove()
              },1000)
            })
      })
    },
    downloadDoc(){
      this.task.requirementDescriptionFileList.forEach(item => {
        oss.ossGetDownloadUrl(item.fileURL.substr(49))
        .then( res => {
          const url = res.downloadURL
          const iframe = document.createElement("iframe")
          iframe.style.display = "none"
          iframe.style.height=0
          iframe.src=url
          document.body.appendChild(iframe)
          setTimeout(() => {
            iframe.remove()
          },1000)
        })
      })
    },
    goReport(reportId){
      console.log(reportId)
      this.$router.push({
        name:"ReportInfo",
        query:{
          taskId:this.taskId,
          reportId:reportId
        }
      })
      // this.$router.push("/reportInfo/"+reportId)
    },
    goMyReportInfo(){
      this.$router.push({
        path:"/myReportInfo",
        query:{
          taskId:this.taskId,
          reportId:this.task.reportId
        }
      })
    },
    goRelease(){
      this.$router.push("/reportRelease/"+this.taskId)
    },
    finish(){
      browserChecked({taskId:this.taskId})
      .then(res => {
        console.log(res)
        if(res.response.code%100 === 0){
          ElMessage.success({
            message:res.response.message,
            type:'success',
            duration:1000,
            onClose:()=>{
              location.reload()
            }
          })
        }
        else {
            ElMessage.error(res.response.message);
        }
      })
    }
  },
  mounted() {
    if (this.role === '0' ) {
      employerBrowserTaskDetail({taskId: this.taskId})
          .then(res => {
            if (res.response.code % 100 === 0) {
              console.log(res.response.message)
              this.task.workerNumTotal = res.workerNumTotal
              this.task.taskState = res.taskState
              this.task.workerNumLeft = res.workerNumLeft
              this.task.requirementDescriptionFileList = res.requirementDescriptionFileList
              this.task.executableFileList = res.executableFileList
              this.task.taskName = res.taskName
              this.task.taskIntroduction = res.taskIntroduction
              this.task.taskStartTime = res.beginTime
              this.task.taskEndTime = res.endTime
              this.task.taskUrgency =res.taskUrgency
              this.task.taskDifficulty = res.taskDifficulty
              this.task.android = res.android
              this.task.linux = res.linux
              this.task.ios = res.ios
              this.task.windows = res.windows
              this.task.harmonyos = res.harmonyos
            }
            else {
              ElMessage.error(res.response.message)
            }
          })
    }
    if (this.role === '2' ) {
      adminGetTaskDetail({taskId: this.taskId})
          .then(res => {
            if (res.response.code % 100 === 0) {
              console.log(res.response.message)
              this.task.workerNumTotal = res.workerNumTotal
              this.task.taskState = res.taskState
              this.task.workerNumLeft = res.workerNumLeft
              this.task.requirementDescriptionFileList = res.requirementDescriptionFileList
              this.task.executableFileList = res.executableFileList
              this.task.taskName = res.taskName
              this.task.taskIntroduction = res.taskIntroduction
              this.task.taskStartTime = res.beginTime
              this.task.taskEndTime = res.endTime
              this.task.taskUrgency =res.taskUrgency
              this.task.taskDifficulty = res.taskDifficulty
              this.task.android = res.android
              this.task.linux = res.linux
              this.task.ios = res.ios
              this.task.windows = res.windows
              this.task.harmonyos = res.harmonyos
            }
            else {
              ElMessage.error(res.response.message)
            }
          })
    }
    if(this.role === '1') {
      employeeBrowserTaskDetail({taskId:this.taskId})
      .then(res => {
        if(res.response.code%100 === 0)
        {
          console.log(res.response.message)
          this.task.workerNumTotal = res.workerNumTotal
          this.task.taskState = res.taskState
          this.task.workerNumLeft = res.workerNumLeft
          this.task.requirementDescriptionFileList = res.requirementDescriptionFileList
          this.task.executableFileList = res.executableFileList
          this.task.taskName = res.taskName
          this.task.taskIntroduction = res.taskIntroduction
          this.task.taskStartTime = res.taskStartTime
          this.task.taskEndTime = res.taskEndTime
          this.task.isSubmitted = res.isSubmitted
          this.task.reportId = res.reportId
          this.task.taskUrgency =res.taskUrgency
          this.task.taskDifficulty = res.taskDifficulty
          this.task.android = res.android
          this.task.linux = res.linux
          this.task.ios = res.ios
          this.task.windows = res.windows
          this.task.harmonyos = res.harmonyos
        }
        else
        {
          ElMessage.error(res.response.message)
        }
      })
    }
      browserReports({taskId: this.taskId})
          .then(res => {
            if (res.response.code % 100 === 0) {
              this.task.reportList = res.reportList
              this.isAble = this.task.taskState === 0
            }
            else {
              ElMessage.error(res.response.message)
            }
          })
      var myChart = echarts.init(document.getElementById("my_graph"));
      window.onresize = function () {
        myChart.resize()// 自适应宽高
      }
      myChart.showLoading();
      axios.get('/graph.json').then(graph => {
        myChart.hideLoading();
        console.log(graph.data)
        graph.data.nodes.forEach(node => {
          node.label = {
            show:node.symbolSize > 30
          }
        })
      var option = {
        title: {
          text: '报告相似度关系展示图'
        },
        tooltip: {}, // 提示框
        legend:[
          {
           data:graph.data.categories.map(a=> {
             return a.name
               }
            )
          }
        ],
        animationDuration:1500,
        animationEasingUpdate:'quinticInOut',
        series: [
          {
            type:"graph",
            layout:"none",
            roam:true, // 鼠标缩放
            color:[], // 自定义调色盘
            data:graph.data.nodes,
            links:graph.data.links,
            categories:graph.data.categories,
            label:{
              position:'right',
              formatter:'{b}'
            }, // 节点label显示
            lineStyle:{
              color:'source',
              curveness:0.3
            },
            emphasis:{
              focus:'adjacency',
              lineStyle: {
                width:10
              }
            }
          }
        ]
      };
        console.log(option)
      myChart.setOption(option);
      })
    }
}
</script>

<style scoped>
.breadcrumb{
  margin-left: 20px;
  font-family: 幼圆;
  font-size: medium;
  margin-top: -10px;
}
.container{
  height: 80vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.box_card{
  width: 90%;
  margin-top: 10px;
  margin-left: 5%;

}
.card_header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.header_left{
  margin-left: 5px;
  display: flex;
  flex-direction: column;
}
.header_right{
  display: flex;
  flex-direction: column;
}
.device_img{
  height:32px;
  padding-left: 16px;
}
.header_tags{
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}
.information{
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}
.relation_container{
  margin-top: 10px;
  width:100%;
  height:400px;
}
</style>