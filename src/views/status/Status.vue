<template>
    <el-col :span="12">
      <h5 style="text-align: center">状态信息</h5>
      <el-menu
        default-active="1">
        <el-menu-item index="1">
          <span>发包方</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span>众包工人</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span>设备</span>
        </el-menu-item>
      </el-menu>
    </el-col>
</template>
  
  <script>
    export default {
      name:"AllStatus",
      methods: {
      }
    }
  </script>