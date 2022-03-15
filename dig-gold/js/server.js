// 导入 express
const express = require('express');
//创建服务器的实例对象
const app = express();

app.get('/server',(request,response)=>{
  response.setHeader('Access-Control-Allow-Origin','*');
  response.send('Hello AJAX')
});

app.listen(8000,()=>{
  console.log('api server running at http://127.0.0.1:8000')
})