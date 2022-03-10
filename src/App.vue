<template>
  <v-app>
    <div id="app">
      <NavigationBar v-if="isRouterAlive"/>
      <router-view />
    </div>
  </v-app>
</template>

<script scope>
import NavigationBar from "@/components/NavigationBar";
export default {
  name: "App",
  provide(){
    return {
      reload: this.reload
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
      reload(){
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
