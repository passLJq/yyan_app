# 攸妍商城app项目结构说明

##### 架构：vue + apicloud + webpack

##### 攸妍商城是一款电商app，上线3天打破三千万营业额，目前日均上千订单。

##### 使用vue+apicloud-api开发，通过webpack打包的方式，配合apicloud云应用打包生成安卓与ios安装包，现已上架安卓应用宝和苹果app store，均可安装使用。

##### 采用前后端分离，使用vant的ui组件。

##### 支持微信支付与小程序分享功能，对接网易七鱼客服以及极光推送功能，实现客服消息以及其他消息的推送。

``` bash
├─build //webpack编译配置
├─dist //项目打包输出目录
├─lib //公用插件
├─common //直接打包的一些资源没有处理的
├─src //编译前源代码
│  ├─assets //资源文件
│  ├─components //存放公用vue组建
│  ├─page //页面
│  ├─util //按需用的脚本和模板
│     └─temple.html //模板文件
└─img //图片
```
