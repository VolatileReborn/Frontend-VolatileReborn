const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
          target: "http://localhost:8000", // 代理地址，这里设置的地址会代替axios中设置的baseURL
          ws:true, // websocket
          changeOrigin: true, // 开启跨域
          pathRewrite: {
            '^/api': '/' // 重写后url为  http://localhost:8080/xxxx
          }
      }
    }
  }
})
