// 导入 express
const express = require('express')
//创建服务器的实例对象
const app = express()
const joi = require('@hapi/joi')

// 导入 cors 中间件
const cors = require('cors')

//测试
app.get('/server',(request,response)=>{
  response.setHeader('Access-Control-Allow-Origin','*');
  response.send('Hello AJAX')
});




// 将 cors 注册为全局中间件
app.use(cors())

//配置解析表单数据的中间件 只能解析application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件
// 在路由之前，封装res.cc函数
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
      res.send({
    // 状态
        status,
    // 状态描述，判断 err 是 错误对象 还是 字符串
        message: err instanceof Error ? err.message : err,
      })
    }
    next()
  })

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))


// 在路由之前配置Token的中间件（必须要在路由之前）
// 导入配置文件
const config = require('./config')

// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))


// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)  //修改
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证

// 导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate')
// 为文章分类的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artCateRouter)

// 导入并使用文章路由模块
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)


//定义错误级别的中间件
app.use(function (err, req, res, next) {
// 数据验证失败
    if (err instanceof joi.ValidationError)  res.cc(err)
//身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
// 未知错误
    res.cc(err)
  })
//启动服务器
app.listen(3007,()=>{
    console.log('api server running at http://127.0.0.1:3007')
})