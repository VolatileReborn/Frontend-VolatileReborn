<template>
    <div class="imgBox" v-if="gb">
        <img @click="toSquare"  class="packageImage" src="../../assets/red.png">
        <a-button ghost type="dashed" size="small" class="close" @click.stop="dj">关闭</a-button>
    </div>
  </template>
  <script>
  export default{
    data () {
      return {
        gb: true,
        isLogout: null
      }
    },
    mounted () {
        this.isLogout = false
    },
    methods: {
      dj () {
        this.gb = false
      },
      countDown (i) {
        let secondsToGo = 3
        i = i + 1
        const modal = this.$success({
          title: `第${i}/5次领取成功！请在个人中心查收`,
          content: `此消息将于 ${secondsToGo} 后自动关闭.`
        })
        const interval = setInterval(() => {
          secondsToGo -= 1
          modal.update({
            content: `此消息将于 ${secondsToGo} 秒后自动关闭.`
          })
        }, 1000)
        setTimeout(() => {
          clearInterval(interval)
          modal.destroy()
        }, secondsToGo * 1000)
      },
      toSquare () {
        // 记录进localStorage 只能领取一次
          var today = new Date()
          var name = sessionStorage.getItem('username')
          var isGet = localStorage.getItem(today.toDateString + name + 'time')
          if (isGet === null || Number(isGet) < 5) {
            isGet = isGet === null ? 0 : Number(isGet)
            localStorage.setItem(today.toDateString + name + 'time', isGet + 1)
            this.countDown(isGet)
            this.gb = false
          } else {
            alert('今天的奖励已经领完了，请明天再来哦')
          }
      }
    }
  }
  </script>
  <style scoped>
  .close
  {
    position: relative;
    right: 50px;
    top: -40px;
  }
  .packageImage
  {
    width: 100px;
  }
  </style>
  