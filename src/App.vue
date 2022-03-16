<template>
    <div id="app">
        <NavigationBar v-if="isRouterAlive" />
      <main >
      <vue-particles
          id="particles-js"
          color="#39AFFD"
          :particle-opacity="0.7"
          :particles-number="70"
          shape-type="edge"
          :particle-size="4"
          lines-color="#8dd1fe"
          :lines-width="1"
          :line-linked="true"
          :lines-distance="150"
          :move-speed="3"
          :hover-effect="true"
          hover-mode="grab"
          :click-effect="true"
          click-mode="push"
      ></vue-particles>
      <router-view v-slot="{Component}" >
        <transition>
          <component :is="Component" />
        </transition>
      </router-view >
      </main>
    </div>
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
  },


}
</script>

<style >
body{
  margin: 0;
  padding:0;
  border: 0;
}
template{
  width: 100vw;
  height:100vh;
  overflow:hidden;
}
#particles-js{
  width:95vw;
  overflow: hidden;
  height: 85vh;
  position: absolute;
  z-index:-1;
}
/*#app{*/
/*  height: 100vh;*/
/*  overflow: hidden;*/
/*  position: relative;*/
/*}*/
/*template{*/
/* width: 100%;*/
/*  height: 100vh;*/
/*  overflow: hidden;*/
/*}*/
/*main{*/
/*  height: calc(100vh - 1.2rem);*/
/*  overflow-y: scroll;*/
/*  -webkit-overflow-scrolling: touch;*/
/*}*/
.v-enter-active,
.v-leave-active{
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to{
  opacity: 0;
}
</style>
