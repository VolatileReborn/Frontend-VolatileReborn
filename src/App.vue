<template>
  <v-app>
    <div id="app">
      <NavigationBar />
      <router-view v-if="isRouterAlive"/>
    </div>
  </v-app>
</template>

<script scope>
import NavigationBar from "@/components/NavigationBar";

export default {
  name: "App",
  provide(){
    return {
      reloadAll: this.reloadAll
    }
  },
  data(){
    return {
      isRouterAlive : true
    }
  },
  components: {
    NavigationBar
  },
  methods:{
      reloadAll(){
        this.isRouterAlive = false
        this.$nextTick(() => {
          this.isRouterAlive =true
        })
      }
  }


}
</script>

<style lang="scss">
</style>
