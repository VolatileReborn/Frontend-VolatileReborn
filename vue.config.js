const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
          // target: "http://124.222.135.47", // 代理地址，这里设置的地址会代替axios中设置的baseURL
          target:"http://localhost:8080",
          ws:true, // websocket
          changeOrigin: true, // 开启跨域
          pathRewrite: {
            '^/api': '/' // 重写后url为  http://124.222.135.47/xxxx
          }
      }
    }

  }
})
