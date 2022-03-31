<template>
  <el-divider></el-divider>
  
  <div class="report_container">
      <div v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <div>
            <report-item class="report_item_container"
          v-for="item in currentReportList"
          v-bind:report="item"
          v-bind:key="item.reportId"
          @click="check_route(item.reportId)"></report-item>
        </div>
        <div style="margin: auto;padding-top:5px">
          <el-pagination
              hide-on-si\-page
              v-model:currentPage="currentPage"
              background
              layout="prev,pager,next"
              v-model:total="totalPage"
              @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
  </div>

</template>

<script>
import ReportItem from "@/components/ReportItem";

import {getAllCooperation} from "@/api/usercenter";

import {ref} from "vue"
const count = ref(0);
const load = () => {
  count.value += 2
}
export default {
  name: "AvailableCooperation",
  data() {
    return {
      reportList:[],
      currentReportList:[],
      role:window.localStorage.getItem("role"),
      currentPage:ref(1),
      totalPage:ref(1)
    }
  },
  mounted(){
    
      getAllCooperation().then(res=>{
        if(res.response.code%100 === 0)
        {
          console.log(res.response)
          this.reportList = res.reportList
          this.currentReportList = this.reportList.slice(0,5)
          this.totalPage = this.reportList.length *2;
          // console.log(this.taskList)
        }
      })
    
   
  },
  components: {
    ReportItem
    
    
  },
  methods: {
    load,
    check_route(reportId){
      this.$router.push("/availableCooperation/"+reportId);
    },
    
    handleCurrentChange(){
        this.currentReportList = this.reportList.slice((this.currentPage-1)*5,this.currentPage*5)
    }
  }
}
</script>

<style scoped>
.report_container{
  width:  100vw;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  /*margin-top: -10px;*/
  height: 80vh;
  margin-top: auto
}
.report_item_container{
  margin-top: 3px;
}
.infinite-list{
  height: 80vh;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}
.upload_btn{
  position: absolute;
  right: 20px;
  bottom: 80px;
  background-color: #42b983;
}
</style>