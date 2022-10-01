<template>
    <div>
      <el-container>
        <el-aside width="240px">
          <el-menu :default-active="status" >
            <el-submenu index="1">
              <el-menu-item-group>
                <el-menu-item @click="menuClick(1)" index="1">发包方</el-menu-item>
                <el-menu-item @click="menuClick(2)"  index="2">众测工人</el-menu-item>
                <el-menu-item @click="menuClick(3)"  index="3">设备</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <EmployerStatus v-show="status === 1" />
            <EmployeeStatus v-show="status === 2" />
            <DeviceStatus v-show="status === 3" />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  <script>
    import EmployerStatus from '@/views/status/EmployerStatus.vue'
    import EmployeeStatus from '@/views/status/EmployeeStatus.vue'
    import DeviceStatus from '@/views/status/DeviceStatus.vue'
    export default {
      name: "AllStatus",
      data() {
        return {
            status: 1
        }
      },
      components: {
        EmployerStatus,
        EmployeeStatus,
        DeviceStatus,
    },
      methods: {
        menuClick(id) {
            this.status = id
        }
      }
    }
  </script>
  <style scoped>
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
    height: 100%;
  }
  
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    height: 100vh;
  }
  
  .el-main {
    background-color: #e9eef3;
    color: #333;
  }
  </style>
  