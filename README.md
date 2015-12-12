# server-app-boilerplate

## 简介

这个项目是基于server的Web app的样板项目，希望可以做到：

- 优化开发体验
- 总结一个更科学的目录结构

对于**开发体验**来说，希望可以做到：

- server端代码修改后自动重启node进程
- client端可以利用到webpack的HMR
- 使用ES2015并用babel转换，保证浏览器兼容性
- 使用eslint统一代码风格

## 项目定位

希望这份模板可以应用于：

**常规的中小型基于Server的Web app：**

这个是项目的基本目标，每一个`router`目录下的文件夹对应一个子站点，每个子站点下可以自定义相应的router，或者是一个小型SPA。建议将前端代码和相应的服务器端模板引擎统一放在`views`中的同名文件夹内。

还有一点是**前后端分离**，希望把提供数据的逻辑分离成另外一个单独的项目，而这个项目仅处理网站的简单逻辑和模板编译。对于开发模式来说，将提供一个mock api服务来方便造假数据。

**中小型SPA项目：**

对于中小型SPA项目而言，服务器端仅负责返回一张`index.html`，`router`目录下只需要少量代码，服务器端代码可以主要放在`api`目录下的mock api服务上，而前端代码可以在项目根目录下额外创建一个目录。


对于大型Web项目来说，通常每个子站点都会被分成一个个子项目，用`nginx`之类的工具做反向代理之类的，该模板不适合这类项目。


## 基本目录结构

```
- api
- bin
- config
- docs
- server
  - helper
  - router
    - home
    - ...others
  - views
    - _layouts
    - _partials
    - ...others
- test
```

- `/api`：仅在开发模式启动的mock api服务
- `/bin`：放一些用来给`npm scripts`执行的脚本
- `/config`：一些配置文件和环境配置
- `/docs`：项目相关的文档
- `/server`：核心逻辑代码放在这里
- `/test`：测试代码

## 项目模块划分

[TODO]: [使用yeoman的generator来选择需要包含的模块](#NEXT:50)

#### 通用CGI模块

提供一个router目录，如果该目录下任何的文件夹且该文件夹下有一个`index.js`文件的话，则该目录将被认为是一个挂载点，比如说有如下目录结构：

```
- router
  - home
  - info
  - about
```

那么app就会有如下挂载点`/`，`/info`，`/about`，其中`/`这个挂载点对应的目录名可以被配置。

使用方法是用`/server/helper`目录下的`cgiHandler`模块，并作为express中间件使用：

```javascript
app.use(cgiHandler({
  index: 'home',
  routerPath: fp.join(__dirname, './router')
}))
```


|配置|描述|
|---|---|
|index|挂载点`/`对应的目录|
|routerPath|挂载点对应资源的所在目录|

计划中的模块

- 一个mock的api服务，用来给前端调试api请求
- 日志模块
- 缓存模块
- oAuth模块

[TODO]: [一个mock的api服务，用来给前端调试api请求](#NEXT:10)
[TODO]: [日志模块](#NEXT:20)
[TODO]: [缓存模块](#NEXT:30)
[TODO]: [oAuth模块](#NEXT:40)

## 使用的工具和框架

Server端

- 使用`express@4.x`作为web server框架
- 使用`express-handlebars`作为server端模板引擎

构建和转化工具

- 使用`better-npm-run`来解决环境变量设置命令的平台兼容性
- 使用`webpack`作为前端bundle工具，具体使用的plugins见`package.json`
- 使用`babel@6.x`作为代码转换工具

平台

- 使用`travis CI`作为持续集成平台

由于是一个模板项目，前端暂时没有依赖库。


Still working on it...
