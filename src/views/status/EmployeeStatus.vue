<template>
    <div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="userId"
            label="用户ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="用户名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="电话号码">
          </el-table-column>
          <el-table-column
            prop="device"
            label="设备">
          </el-table-column>
          <el-table-column
            prop="professionalSkill"
            label="专业技能">
          </el-table-column>
          <el-table-column
            prop="finishedTaskNum"
            label="完成任务数量">
          </el-table-column>
          <el-table-column
            prop="acceptedTaskNum"
            label="接收任务数量">
          </el-table-column>
          <el-table-column
            prop="collaborationNum"
            label="合作任务数量">
          </el-table-column>
          <el-table-column
            prop="activeDegree"
            label="活跃度">
          </el-table-column>
          <el-table-column
            prop="lastLoginTime"
            label="最近一次登录事件">
          </el-table-column>
          <!-- <el-table-column
            prop="numOfEachTaskDifficulty"
            label="每个难度的任务数量">
          </el-table-column>
            <el-table-column
                prop="numOfEachTaskType"
                label="每个类型的任务数量">
            </el-table-column> -->
            <el-table-column
                prop="taskFavorList"
                label="喜欢的任务列表">
            </el-table-column>
            <!-- <el-table-column
                prop="numOfEachScore"
                label="每个分数的数量">
            </el-table-column> -->
        </el-table>
        <page :goPage="goPage" :pageAll="pageAll"></page>
    </div>
    </template>
    <script>
    import { getEmployeeStatus } from '../../api/status'
    import Page from "../../components/Page.vue";
    export default {
        components: {
            Page
        },
        data() {
            return {
                tableData: [{
                    userId: '设备1',
                    nickName: '2016-05-02',
                    phoneNumber: '王小虎',
                    publishedTaskNum: '上海市普陀区金沙江路 1518 弄',
                    recruitingTaskNum: '上海市普陀区金沙江路 1518 弄',
                    lastTaskPublishedTime: '上海市普陀区金沙江路 1518 弄',
                    lastLoginTime: '上海市普陀区金沙江路 1518 弄',
                    numOfEachTaskDifficulty: '上海市普陀区金沙江路 1518 弄',
                    numOfEachTaskType: '上海市普陀区金沙江路 1518 弄'
              }],
              pageAll: 10,
                pageSize: 15,
                page: 1,
            }
        },
        methods: {
            goPage(page) {
                this.getStatus(page, this.pageSize)
            },
            getStatus(page, pageSize) {
                getEmployeeStatus({ pageNum: page, pageSize: pageSize }).then((res) => {
                    this.pageAll = Math.ceil(res.currSumSize / this.pageSize)
                    res.employeeList.forEach((item) => {
                        item.lastLoginTime = new Date(item.lastLoginTime).toLocaleString()
                    })
                    this.tableData = res.employeeList
                })
            }
        },
        mounted() {
            this.getStatus(1,this.pageSize)
        }
    }
    </script>