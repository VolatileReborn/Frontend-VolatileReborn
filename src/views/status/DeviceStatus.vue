<template>
<div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="deviceName"
        label="设备名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="numOfUsers"
        label="用户数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="NumofTasks"
        label="任务数量">
      </el-table-column>
      <el-table-column
        prop="numOfRecruitingTasks"
        label="招募任务数量">
      </el-table-column>
    </el-table>
</div>
</template>
<script>
import { getgetDeviceStatus } from '../../api/status'
export default {
    data() {
        return {
            tableData: [{
            deviceName: '设备1',
            numOfUsers: '2016-05-02',
            NumofTasks: '王小虎',
            numOfRecruitingTasks: '上海市普陀区金沙江路 1518 弄'
          }]
        }
    },
    mounted() {
        getgetDeviceStatus().then(res => {
            console.log(res)
        })
    }
}
</script>
