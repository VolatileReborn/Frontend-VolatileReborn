<template>
  <el-result
     style="margin-top: 100px">
    <template #icon>
      <img src="../../assets/success.png">
    </template>
    <template #title>
      <div style="font-weight: bolder;font-size:xx-large">任务已完成！</div>
    </template>
  </el-result>
</template>

<script>
export default {
  name: "TaskFinished",
  components: {
  }
}
</script>

<style scoped>

</style>