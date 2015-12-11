# server-app-boilerplate

## 简介

这个项目是基于server的Web app的样板项目，主要的目标是有两个：

- 优化开发体验
- 总结一个更科学的目录结构

对于**开发体验**来说，希望可以做到如下的事情：

- server端代码修改后自动重启node进程
- client端可以利用到webpack的HMR
- 使用ES2015并用babel转换，保证浏览器兼容性
- 使用eslint统一代码风格

## 项目模块划分

[TODO]: [使用yeoman的generator来选择需要包含的模块](#NEXT:50)

- 通用cgi模块

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

- 使用`better-npm-run`来解决环境变量设置命令的平台兼容性
- 使用`express@4.x`作为web server框架
- 使用`express-handlebars`作为server端模板引擎

Still working on it...
