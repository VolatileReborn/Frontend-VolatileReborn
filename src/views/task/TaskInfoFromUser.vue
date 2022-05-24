<template>
  <el-divider></el-divider>
  <el-breadcrumb separator="/"  class="breadcrumb">
    <el-breadcrumb-item @click="go_route"><strong>个人中心</strong></el-breadcrumb-item>
    <el-breadcrumb-item>任务详情</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="container" v-infinite-scroll="load" style="overflow: auto">
    <el-card class="box_card">
      <template #header>
<!--        <div class="card_header">-->
<!--          <div class="header_left">-->
<!--            <span style="font-size: larger">{{task.taskName}}</span>-->
<!--            <div class="header_tags">-->
<!--              <el-tag v-if="task.taskState === 0" class="header_tag" type="warning">进行中</el-tag>-->
<!--              <el-tag v-if="task.taskState === 1" class="header_tag" type="info">已结束</el-tag>-->
<!--              <el-tag v-if="task.taskType === 0" style="margin-left: 10px">功能测试</el-tag>-->
<!--              <el-tag v-if="task.taskType === 1" style="margin-left: 10px" type="success">性能测试</el-tag>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="header_right">-->
<!--            <div style="font-size: small">紧急程度：<el-rate v-model="task.taskUrgency"-->
<!--                                                        show-text-->
<!--                                                        :texts="['非常宽松','宽松','一般紧急','紧急','非常紧急']"-->
<!--                                                        :colors="['#67c23a','#FF9900','#ff0000']"-->
<!--                                                        disabled/>-->
<!--            </div>-->
<!--            <div style="font-size: small">任务难度：<el-rate v-model="task.taskDifficulty"-->
<!--                                                        show-text-->
<!--                                                        :texts="['轻松','容易','一般','较难','困难']"-->
<!--                                                        :colors="['#67c23a','#FF9900','#ff0000']"-->
<!--                                                        disabled/>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div class="card_header">
          <div class="header_left">
            <img v-if="task.taskType === 0" src="../../assets/functional_test.png" class="task_pic"/>
            <img v-if="task.taskType === 1" src="../../assets/performance_test.png" class="task_pic" />
          </div>
          <div class="header_right">
            <div style="display:flex;flex-direction: row">
            <div>
              <div class="task_name">{{task.taskName}}</div>
              <div class="header_tags">
                <el-tag v-if="task.taskState === 0" class="header_tag" type="warning">进行中</el-tag>
                <el-tag v-if="task.taskState === 1" class="header_tag" type="info">已结束</el-tag>
                <el-tag v-if="task.taskType === 0" style="margin-left: 10px">功能测试</el-tag>
                <el-tag v-if="task.taskType === 1" style="margin-left: 10px" type="success">性能测试</el-tag>
              </div>
            </div>
            <div style="margin-left: 20vw;width: 40vw;position: relative;">
              <div style="font-size: small">紧急程度：<el-rate v-model="task.taskUrgency"
                                                        show-text
                                                        :texts="['非常宽松','宽松','一般紧急','紧急','非常紧急']"
                                                        :colors="['#67c23a','#FF9900','#ff0000']"
                                                        disabled/></div>
              <div style="font-size: small">任务难度：<el-rate v-model="task.taskDifficulty"
                                                        show-text
                                                        :texts="['轻松','容易','一般','较难','困难']"
                                                        :colors="['#67c23a','#FF9900','#ff0000']"
                                                        disabled/></div>
            </div>
            </div>
            <div style="margin-top:10px"><el-icon><Clock /></el-icon>  发布日期 ： {{ parseTime(task.taskStartTime)}}</div>
            <div style="margin-top: 5px"><el-icon><Clock /></el-icon>  结束日期 ： {{parseTime(task.taskEndTime)}}</div>
            <div style="margin-top: 10px"><el-icon><User /></el-icon>  参与人员 ： 剩余 <span style="font-weight: bold;color:#409efc ">{{task.workerNumLeft}}</span>  人  <el-divider direction="vertical" ></el-divider>  总需  <span style="font-weight: bold;color:#409efc ">{{task.workerNumTotal}}</span> 人</div>
            <div v-if="role === '1'" style="position: relative;margin-left:600px;display:flex;flex-direction: row" >
              <el-button  type="danger" @click="goRelease" v-if="task.taskState === 0">提交报告</el-button>
              <el-button  v-if="task.isSubmitted === 1" type="primary"  style="margin-left: 10px" @click="showAllMyReport">我的报告</el-button>
            </div>
            <div v-if="this.role === '0'">
              <el-button v-if="task.taskState === 0" type="danger" round style="position: relative;margin-left: 600px" size="large" @click="finish()" >结束任务</el-button>
            </div>
            <el-dialog v-model="reportsVisible" title="我的报告列表">
              <el-table :data="reports"
                        stripe
                        highlight-current-row
                        type-layout="auto">
                <el-table-column type="index" width="100" align="center" />
                <el-table-column prop="reportName" label="报告名称"  align="center"/>
                <el-table-column prop="similarity" label="相似度(%)"  align="center"/>
                <el-table-column label="操作" align="center">
                  <template #default="scope">
                    <el-button size="small" type="primary" @click="goMyReportInfo(scope.row.reportId)">查看报告</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
          </div>
        </div>
      </template>
      <el-tabs type="border-card">
        <el-tab-pane label="任务信息">
          <div class="information">
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
            <el-divider />
            <div class="file_information" >
              <div style="display: flex;flex-direction: row;margin-top:20px">
                <el-icon color="#409efc" :size="30">
                  <folder-checked />
                </el-icon>
                <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">附件下载</div>
              </div>
              <div style="display: flex;flex-direction: column">
                <el-button class="download_btn"  @click="downloadExe">下载待测应用可执行文件<img class="file_pic" src="../../assets/exe.png" /></el-button>
                <el-button class="download_btn" style="margin-left: 0" type="primary"  @click="downloadDoc">下载测试需求描述文件<img class="file_pic" src="../../assets/md.png" /></el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="报告列表">
          <div style="font-weight: lighter;font-size: small;margin-top: 10px">下拉列表查看更多</div>
          <el-table :data="task.reportList"
                    height="400"
                    style="width:100%;margin-top: 10px;text-align: center"
                    stripe
                    border
                    size="large"
                    highlight-current-row
                    type-layout="auto">
            <el-table-column type="index" width="100" align="center" />
            <el-table-column prop="reportName" label="报告名称"  align="center"/>
            <el-table-column prop="similarity" label="相似度(%)"  align="center"/>
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
        </el-tab-pane>
        <el-tab-pane label="报告相似度关系图">
          <div style="font-weight: lighter;font-size: small;margin-top: 10px">可视化图像不加载可刷新页面查看</div>
          <div class="relation_container" id="my_graph"></div>
        </el-tab-pane>
        <el-tab-pane label="报告协作树状图">
          <div style="font-weight: lighter;font-size: small;margin-top: 10px">可视化图像不加载可刷新页面查看</div>
          <div class="relation_container" id="my_tree"></div>
        </el-tab-pane>
        <el-tab-pane label="报告聚合散点图">
          <div style="font-weight: lighter;font-size: small;margin-top: 10px">可视化图像不加载可刷新页面查看</div>
          散点图
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {FolderChecked} from "@element-plus/icons-vue"
import {Edit} from "@element-plus/icons-vue"
import {Avatar} from "@element-plus/icons-vue"
import {Clock} from "@element-plus/icons-vue"
import {User} from "@element-plus/icons-vue"
import {employerBrowserTaskDetail} from "@/api/task";
import {employeeBrowserTaskDetail} from "@/api/task";
import {adminGetTaskDetail} from "@/api/usercenter";
import {browserReports} from "@/api/report";
import {browserChecked} from "@/api/usercenter";
import {getAllMyReport} from "@/api/report";
import oss from "@/utils/oss"
import {parseTime} from "@/utils/utils";
import {ref} from "vue"
import {ElMessage} from "element-plus";
import * as echarts from 'echarts'
import $ from 'jquery'
import router from "@/router";

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
        taskType: ref(),
        workerNumTotal: 0,
        workerNumLeft: 0,
        taskStartTime: 0,
        taskEndTime: 0,
        taskState: ref(1),
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
      docName:'',
      reportsVisible:false,
      reports:[
        // {reportName:'测试报告1',similarity:80,reportId:3},
        // {reportName: '测试报告2',similarity:80,reportId:6}
      ]
    }
  },
  components: {
    FolderChecked,
    Edit,
    Avatar,
    Clock,
    User
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
    },
    goMyReportInfo(reportId){
      this.$router.push({
        path:"/myReportInfo",
        query:{
          taskId:this.taskId,
          reportId:reportId
        }
      })
    },
    goRelease(){
      this.$router.push({
        path:"/reportRelease/",
        query: {
          taskId:this.taskId
        }
    })
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
    },
    getData(){
      var taskId = this.taskId
      $.ajax({
        type:'get',
        async:true,
        url:`http://124.222.135.47:8000/api/report/getSimilarityGraph?taskId=${this.taskId}`,
        // url:`/testData.json`,
        success:function(res) {
          if(res)
          {
            var myChart = echarts.init(document.getElementById("my_graph"));
            res.nodes.forEach(function ( node) {
              node.label = {
                show : node.symbolSize > 5
              }
            })
            let option = {
              legend: [
                {
                  data: res.categories.map(a => {
                        return a.name
                      }
                  )
                }
              ],
              title: {
                text: '报告相似度关系展示图',
                top:'bottom',
              },
              tooltip: {
                show: {
                  node:true,
                  link:false
                }
              }, // 提示框
              animationDuration: 1500,
              animationEasingUpdate: 'quinticInOut',
              series: [
                {
                  type: "graph",
                  layout: "force",
                  roam: true, // 鼠标缩放
                  zoom:4,
                  color: [], // 自定义调色盘
                  data: res.nodes,
                  links: res.links,
                  categories: res.categories,
                  label: {
                    position: 'right',
                    formatter: '{c}'
                  }, // 节点label显示
                  edgeLabel:{
                    show:true
                  },
                  lineStyle: {
                    color: 'source',
                    curveness: 0.2, // 曲度
                    opacity:0.5
                  },
                  emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                      width: 10
                    }
                  }
                }
              ]
            };
            myChart.setOption(option);
            myChart.on('click',function (params) {
              //console.log(params.data.tooltip.formatter)
              router.push({
                name:"ReportInfo",
                query:{
                  taskId:taskId,
                  reportId:params.data.tooltip.formatter
                }
              })
            })
          }
        }
      })
      $.ajax({
        type:'get',
        async:true,
        url:`http://124.222.135.47:8000/api/report/getCooperationTree?taskId=${this.taskId}`,
        success:function(res) {
          if(res)
          {
            var myChart = echarts.init(document.getElementById("my_tree"));
            res.children.forEach(function (datum, index) {
              index % 2 === 0 && (datum.collapsed = true);
            });
            myChart.setOption(
                ({
                  title: {
                    text: '报告协作关系展示图',
                    top:'bottom',
                  },
                  tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                  },
                  series: [
                    {
                      type: 'tree',
                      data: [res],
                      top: '1%',
                      left: '7%',
                      bottom: '1%',
                      right: '20%',
                      symbolSize: 7,
                      label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 9,
                        formatter:'{c}'
                      },
                      leaves: {
                        label: {
                          position: 'right',
                          verticalAlign: 'middle',
                          align: 'left',
                          formatter:'{c}'
                        }
                      },
                      emphasis: {
                        focus: 'descendant'
                      },
                      expandAndCollapse: true,
                      animationDuration: 550,
                      animationDurationUpdate: 750
                    }
                  ]
                })
            );
          }}})
    },
    showAllMyReport(){
      this.reportsVisible = true
      getAllMyReport({taskId:this.taskId})
      .then(res => {
        if(res.response.code %100 === 0)
        {
          this.reports = res.reportList
        }
        else {
          ElMessage.error(res.response.message)
        }
      })
    }
  },
  mounted() {
    if (this.role === '0') {
      employerBrowserTaskDetail({taskId: this.taskId})
          .then(res => {
            if (res.response.code % 100 === 0) {
              console.log(res.response.message)
              this.task.workerNumTotal = res.workerNumTotal
              this.task.taskState = res.taskState
              this.task.taskType = res.taskType
              this.task.workerNumLeft = res.workerNumLeft
              this.task.requirementDescriptionFileList = res.requirementDescriptionFileList
              this.task.executableFileList = res.executableFileList
              this.task.taskName = res.taskName
              this.task.taskIntroduction = res.taskIntroduction
              this.task.taskStartTime = res.beginTime
              this.task.taskEndTime = res.endTime
              this.task.taskUrgency = res.taskUrgency
              this.task.taskDifficulty = res.taskDifficulty
              this.task.android = res.android
              this.task.linux = res.linux
              this.task.ios = res.ios
              this.task.windows = res.windows
              this.task.harmonyos = res.harmonyos
            } else {
              ElMessage.error(res.response.message)
            }
          })
    }
    if (this.role === '2') {
      adminGetTaskDetail({taskId: this.taskId})
          .then(res => {
            if (res.response.code % 100 === 0) {
              console.log(res.response.message)
              this.task.workerNumTotal = res.workerNumTotal
              this.task.taskState = res.taskState
              this.task.taskType = res.taskType
              this.task.workerNumLeft = res.workerNumLeft
              this.task.requirementDescriptionFileList = res.requirementDescriptionFileList
              this.task.executableFileList = res.executableFileList
              this.task.taskName = res.taskName
              this.task.taskIntroduction = res.taskIntroduction
              this.task.taskStartTime = res.beginTime
              this.task.taskEndTime = res.endTime
              this.task.taskUrgency = res.taskUrgency
              this.task.taskDifficulty = res.taskDifficulty
              this.task.android = res.android
              this.task.linux = res.linux
              this.task.ios = res.ios
              this.task.windows = res.windows
              this.task.harmonyos = res.harmonyos
            } else {
              ElMessage.error(res.response.message)
            }
          })
    }
    if (this.role === '1') {
      employeeBrowserTaskDetail({taskId: this.taskId})
          .then(res => {
            if (res.response.code % 100 === 0) {
              console.log(res.response.message)
              this.task.workerNumTotal = res.workerNumTotal
              this.task.taskState = res.taskState
              this.task.taskType = res.taskType
              this.task.workerNumLeft = res.workerNumLeft
              this.task.requirementDescriptionFileList = res.requirementDescriptionFileList
              this.task.executableFileList = res.executableFileList
              this.task.taskName = res.taskName
              this.task.taskIntroduction = res.taskIntroduction
              this.task.taskStartTime = res.taskStartTime
              this.task.taskEndTime = res.taskEndTime
              this.task.isSubmitted = res.isSubmitted
              this.task.reportId = res.reportId
              this.task.taskUrgency = res.taskUrgency
              this.task.taskDifficulty = res.taskDifficulty
              this.task.android = res.android
              this.task.linux = res.linux
              this.task.ios = res.ios
              this.task.windows = res.windows
              this.task.harmonyos = res.harmonyos
            } else {
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
        })
    setTimeout(()=>{
      this.getData()
    },1000)
  },

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
.task_pic{
  height:30vh;
  width:30vh;
  margin-left: 5vw;
}
.header_left{
  margin-left: 5px;
  display: flex;
  flex-direction: column;
}
.header_right{
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width:800px;

}
.task_name{
  font-weight:bolder;
  font-size:x-large;
  font-family:幼圆;
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
.file_pic{
  height:5vh;
  margin-left: 5px;
}
.download_btn{
  margin-top:10px;
  width: 20vw;
}
.relation_container{
  margin-top: 10px;
  width:83vw;
  height:400px;
}
</style>