/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
//导入数据库操作模块
 const db = require('../db/index')
 //导入bcryptjs 包
 const bcrypt = require('bcryptjs')
 //导入生成Token的包
 const jwt = require('jsonwebtoken')
//导入全局的配置文件
const config = require('../config')



// 注册用户的处理函数
exports.regUser = (req, res) => {
  //获取客服端提交到服务器的用户信息
  const userinfo = req.body
  //对表单中的数据，进行合法性的校验
  //if (!userinfo.username || !userinfo.password) {
  //return res.send({ status: 1, message: '用户名或密码不能为空！' })
  //}







 //定义 SQL 语句，查询用户名是否被占用
  const sql = `select * from ev_users where username=?`
  db.query(sql, [userinfo.username], function (err, results){
    // 执行 SQL 语句失败
    if (err) {
      //return res.send({ status: 1, message: err.message })
      return res.cc(err)
    }
    // 用户名被占用
    if (results.length > 0) {
      //return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
      return res.cc('用户名被占用，请更换其他用户名！')
    }
    // 调用bcrypt.hashSync()对密码进行加密
    userinfo.password = bcrypt.hashSync(userinfo.password,10)
    //定义插入新用户的SQL语句
    const sql = 'insert into ev_users set ?'
    //调用db.query()执行SQL语句
    db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
    // 执行 SQL 语句失败
      //if (err) return res.send({ status: 1, message: err.message })
      if(err) return res.cc(err)

    // SQL 语句执行成功，但影响行数不为 1,也需要return出去

    //if (results.affectedRows !== 1) {return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })}
    if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
    //上述的两次判断都没有return出去，那么就注册成功
    //res.send({ status: 0, message: '注册成功！' })
    res.cc('注册成功',0)
    })
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  //接受表单的数据
  const userinfo = req.body
  //定义SQL语句
  const sql = `select * from ev_users where username=?`
  //执行SQL语句，根据用户名查询用户信息
  db.query(sql, userinfo.username, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是查询到数据条数不等于 1
    if (results.length !== 1) return res.cc('登录失败！')


    // TODO：判断用户输入的登录密码是否和数据库中的密码一致
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    // 如果对比的结果等于 false, 则证明用户输入的密码错误
    if (!compareResult) return res.cc('登录失败！')


    //TODO:在服务器端生成Token的字符串
    const user = { ...results[0],password:'',user_pic:''}
    //对用户信息进行加密生成Token字符串
    const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
    // 调用 res.send()将Token 响应给客户端
    res.send({
      status: 0,
      message: '登录成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr,
    })
  })
  
}


