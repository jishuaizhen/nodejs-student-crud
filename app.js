/**
 * app.js 入口模块
 * 职责：
 *  1.创建服务
 *  2.做一些服务相关的配置
 *   - 模板引擎
 *   - body-parse解析post请求体
 *   - 提供静态资源服务
 *  3.挂载路由
 *  4.监听端口启动服务
 */
var express = require('express')
var bodyParser = require('body-parser')


var router = require('./router')
var app = express()
app.engine('html', require('express-art-template'));
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

// 配置bodyParse
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 把路由挂载到app服务器上
app.use(router)

app.listen(3000,function(){
    console.log('running...')
})

module.exports = app
