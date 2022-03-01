<template>
  <div>taskSquare</div>
  <v-spacer></v-spacer>
  <task-item></task-item>
</template>

<script>
import TaskItem from "@/components/TaskItem";
export default {
  name: "TaskSquare",
  data() {
    return {}
  },
  components: {
    TaskItem
  }
}
</script>

<style scoped>

</style>