<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: "LoadingItem"
}
</script>

<style scoped>
.loading{
  position:fixed;
  left: 0;
  top:0;
  background: url('../assets/loading.svg') center center no-repeat rgba(0,0,0,0.7);
  background-size: 100px 100px;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}
</style>