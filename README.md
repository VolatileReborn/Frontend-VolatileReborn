## Frontend_VolatileReborn

众包平台前端项目

# Visit on Internet
Public URL:
We're using Docker Swarm, so the project has `nodePort` function, which means you can visit any of the URLs below:
* http://124.222.135.47:81/#/
* http://123.56.20.222:81/#/
# Run Locally
```
npm install && npm run build && npm run serve
```

Or you can use Docker:
```
docker build -t lyklove/frontend_volatile_reborn:lates -f ./Dockerfile.node-alpine .
docker run -d -p 81:80 --rm --name Frontend_VolatileReborn lyklove/frontend_volatile_reborn:latest
```

then visit http://localhost:81/#/

## dependencies
不一定是项目中正在用的版本, 但是下面的依赖经过测试, 一定能用

* node 14.16.0

* npm 6.14.11


* vue-cli 5.0.1

* vue 3.x


### 项目目录及说明
--project

----node_modules

----public

----src

--------api: 接口js文件

--------assert：资源文件（图片等）

--------components: vue公共组件

--------layouts: 布局组件

--------plugins: 使用支持vue3的element plus组件库

--------router: index.js页面路由

--------views: 页面以全局组件的形式存放

--------App.vue: 页面入口文件

--------main.js: 程序入口文件，加载各种公共组件
