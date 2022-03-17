## 2022春冰岩前端实习

### 代码验收指南：

```
index.html  主页
boiling.html 沸点
home.html  我
headline.html  主页-头条精选（含下拉刷新动画）
index-hotlist.html  主页-热榜
login.html  登录页面（从“我”页面点击进去）
register.html  注册页面（从登录页面点击进入）
art_pub.html  发布文章页面（从“我”-“创作者中心"点击进入）

后台接口：请参照“服务器端口汇总.md”
```

### scheme：

- [x] 基本界面结构和样式

  - [x] 首页
  - [x] 沸点
  - [x] 我
  - [x] 登录注册页面
  - [x] 热榜
  - [x] 头条精选
  - [x] 发布文章页面（home的“创作者中心”）

- [x] 基本交互效果

  - [x] 顶部导航条移动、选中效果
  - [x] 底部菜单栏切换页面
  - [x] 多标签的展开与折叠
  - [x] 顶部导航条页面切换
  - [x] 点击文章以查看具体文章

- [x] 进阶交互效果

  - [x] 下拉刷新时的动画（并实现每一次刷新更新时间）

  - [x] 个人页面深色主题的切换

  - [x] 不同机型的适配（？存疑）

- [ ] 前后端交互

  - [x] 搭建后台
  - [x] 登录注册以及相关逻辑
  - [x] 文章的发布及删除
  - [x] 查看用户个人信息，包括点赞数、评论数、关注数目
  - [ ] 对文章的评论、点赞，对作者的关注，并完成数据同步
  - [ ] 实现文章搜索功能

