<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="deviceName" label="设备名称" width="180">
      </el-table-column>
      <el-table-column prop="numOfUsers" label="用户数量" width="180">
      </el-table-column>
      <el-table-column prop="NumOfTasks" label="任务数量"> </el-table-column>
      <el-table-column prop="numOfRecruitingTasks" label="招募任务数量">
      </el-table-column>
    </el-table>
    <page :goPage="goPage" :pageAll="pageAll"></page>
  </div>
</template>
<script>
import { getDeviceStatus } from "../../api/status";
import Page from "../../components/Page.vue";
export default {
  components: { Page },
  data() {
    return {
      tableData: [
        {
          deviceName: "设备1",
          numOfUsers: "2016-05-02",
          NumOfTasks: "王小虎",
          numOfRecruitingTasks: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      pageAll: 10,
      pageSize: 15,
      page: 1,
    };
  },
  methods: {
    goPage(page) {
      this.getStatus(page, this.pageSize);
    },
    getStatus(page, pageSize) {
      getDeviceStatus({ pageNum: page, pageSize: pageSize }).then((res) => {
        this.pageAll = Math.ceil(res.currSumSize / this.pageSize);
        this.tableData = res.deviceList;
      });
    },
  },
  mounted() {
    this.getStatus(1,this.pageSize)
  },
};
</script>
