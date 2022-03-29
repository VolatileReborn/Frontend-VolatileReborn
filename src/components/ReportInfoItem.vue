<template>
  <el-card :body-style="{padding: '0px'}" class="reportInfo_card">
    <template #header>
        <div style="display: flex;flex-direction: column">
          <div><span style="font-weight: bolder;font-size: xx-large">测试报告</span></div>
          <div style="font-size: small;color:#9A9A9A" v-if="workerId !== -1">测试工人ID: {{this.workerId}}</div>
        </div>
    </template>  
    <div class="need_information">
        <div style="display: flex;flex-direction: row">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷情况详情 </div>
        </div>
        <div style="margin-top: 10px"> <span >{{taskReport.defectExplain}}</span></div>
      </div>
      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷复现步骤 </div>
        </div>
        <div style="margin-top: 10px"> <span >{{taskReport.defectReproduction}}</span></div>
      </div>

      <div class="need_information">
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <edit />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">测试设备信息</div>
        </div>
        <div style="margin-top: 10px"> <span >{{taskReport.testEquipmentInfo}}</span></div>
      </div>

      <div class="file_information" >
        <div style="display: flex;flex-direction: row;margin-top:20px">
          <el-icon color="#409efc" :size="30">
            <folder-checked />
          </el-icon>
          <div style="font-size: large;margin-top: 2px;font-weight: bolder;margin-left: 5px">缺陷应用截图</div>
        </div>
          <div  style="display:flex;flex-direction: row;margin-top: 5px">
            <div v-for="item in taskReport.defectPictureList"
                 v-bind:key="item.fileName" >
              <el-image :src="item.fileURL"  alt="" style="height: 15vh;margin-left: 5px" :preview-src-list="srcList" :initial-index="0" lazy fit="scale-down"/>
            </div>
          </div>
      </div>
      <el-divider ><el-icon><star-filled /></el-icon></el-divider>
  </el-card>
</template>

<script>


export default {
  name: "ReportInfoItem",
  props: ["taskReport"],
  
}
</script>

<style scoped>

.reportInfo_card{
  width: 50%;
  margin-top: 10px;
  margin-left: 5%;
}

</style>