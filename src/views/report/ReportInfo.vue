<template>
  <el-divider></el-divider>
  <el-breadcrumb separator="/"  class="breadcrumb">
    <el-breadcrumb-item :to="{path: '/TaskSquare'}">个人中心</el-breadcrumb-item>
    <el-breadcrumb-item>测试报告详情</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="container">
    <el-card class="box_card">
      
      
      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷情况详情 </div>
        </div>
        <div style="margin-top: 10px"> <span style="font-weight: bold">{{taskReport.defectExplain}}</span></div>
      </div>

      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷复现步骤 </div>
        </div>
        <div style="margin-top: 10px"> <span style="font-weight: bold">{{taskReport.defectReproduction}}</span></div>
      </div>

      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">需求描述</div>
        </div>
        <div style="margin-top: 10px"> <span style="font-weight: bold">{{taskReport.testEquipmentInfo}}</span></div>
      </div>

      <div class="file_information" >
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <folder-checked />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">附件下载</div>
        </div>
          <div>
          <el-button type="text" @click="downloadPics">点击下载出现缺陷的应用截图</el-button>
          
          </div>
      </div>
      <el-divider ><el-icon><star-filled /></el-icon></el-divider>
      
    </el-card>
  </div>
</template>

<script>
import {FolderChecked} from "@element-plus/icons-vue"

import {Edit} from "@element-plus/icons-vue"
import {StarFilled} from "@element-plus/icons-vue"
// import ReportItem from "@/components/ReportItem"



export default {
  name: "ReportInfo",
  data() {
    return {
     
      taskReport: {
        defectExplain:'',
		defectReproduction:'',
		testEquipmentInfo:'',
        
        
      },
      isAble: !this.taskState,

    }
  },
  components: {
    FolderChecked,
    Edit,
    StarFilled,
    // ReportItem
  },
  methods: {
    
    downloadPics(){

    }
    
    
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
.box_card{
  width: 90%;
  margin-top: 10px;
  margin-left: 5%;
}
.card_header{
  margin-left: 5px;
  display: flex;
  flex-direction: column;
}
.header_tags{
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}
.information{
  display: flex;
  flex-direction: column;
}
.check_btn{
  position: absolute;
  right: 90px;
  bottom: 65px;
}
</style>