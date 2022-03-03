<template>
  <v-app>
    <div id="app">
      <NavigationBar />
      <router-view />
    </div>
  </v-app>
</template>

<script scope>
import NavigationBar from "@/components/NavigationBar";

export default {
  name: "App",

  components: {
    NavigationBar
  },


}
</script>

<style lang="scss">
</style>
