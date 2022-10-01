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
            prop="publishedTaskNum"
            label="发布任务数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="recruitingTaskNum"
            label="招募任务数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="lastTaskPublishedTime"
            label="上次发布事件"
            width="180">
          </el-table-column>
          <el-table-column
            prop="lastLoginTime"
            label="上次登录事件"
            width="180">
          </el-table-column>
          <!-- <el-table-column
            prop="numOfEachTaskDifficulty"
            label="每个难度的任务数量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="numOfEachTaskType"
            label="每个类型的任务数量"
            width="180">
          </el-table-column> -->
        </el-table>
        <page :goPage="goPage" :pageAll="pageAll"></page>
    </div>
    </template>
    <script>
    import { getEmployerStatus } from '../../api/status'
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
                getEmployerStatus({ pageNum: page, pageSize: pageSize }).then((res) => {
                    this.pageAll = Math.ceil(res.currSumSize / this.pageSize)
                    res.employerList.forEach((item) => {
                        item.lastTaskPublishedTime = new Date(item.lastTaskPublishedTime).toLocaleString()
                        item.lastLoginTime = new Date(item.lastLoginTime).toLocaleString()
                    })
                    this.tableData = res.employerList
                })
            }
        },
        mounted() {
            this.getStatus(1,this.pageSize)
        }
    }
    </script>
    