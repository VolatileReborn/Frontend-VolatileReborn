<template>
  <div class="user-center">
   
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="200px" >
          <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :router=true
      >       
        <el-menu-item index="1">
          <el-icon><location /></el-icon>
          <span>正在进行</span>
        </el-menu-item>
        
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>历史任务</span>
        </el-menu-item>
        
        
      </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

    
  </div>
</template>

<style scoped>
.common-layout .el-header {
  background-color: #C1CBD7;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}
.common-layout .el-footer {
  line-height: 60px;
}

.common-layout .el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.common-layout .el-main {
  background-color: light-grey;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

.common-layout > .el-container {
  margin-bottom: 40px;
}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.common-layout .el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>


<script>
export default {
  name: 'user-center',
  data() {
    return {
      username: '',
      isCollapse: false,
       breadcrumbItems: ['正在进行'],
    }
  },
  methods: {
    
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath){
        switch(key){
          case '1':
            this.$router.push('/Page1');
            this.breadcrumbItems  = ['正在进行']
            break;
          case '2':
            this.$router.push('/Page2')
            this.breadcrumbItems  = ['历史任务']
            break;
          
        }
        console.log(key, keyPath);
      },
    
  },
  
}
</script>
