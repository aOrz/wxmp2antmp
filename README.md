# wxmp2antmp
## 什么是 wxmp2antmp？

> wxmp2antmp 是一个微信小程序转支付宝小程序的命令行工具

## 安装

`npm i -g wxmp2antmp`

## 使用

`w2a 微信小程序目录 支付宝小程序目录`

## 注意事项

* 支付宝小程序中的路径解析和微信小程序中的路径解析是不同的,路径必须为相对路径，如： import a from './a'，wxml中的路径会被自动处理，js 和 css 中需要自行处理。
* css 中 import 的 css 的路径文件名需要手动修改（todo）
* js 中的 wx 变量会被赋值为 my
* 微信小程序和支付宝小程序的 api 存在差异，建议自行写一套兼容库，暂无 todo 计划