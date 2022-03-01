<template>
  <div>
    taskId: {{taskId}}
  </div>
</template>

<script>
export default {
  name: "TaskInfoFromSquare",
  data() {
    return {
      taskId: this.$route.params.taskId
    }
  }
}
</script>

<style scoped>

</style>