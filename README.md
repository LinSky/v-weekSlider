# v-week-slider
## 介绍
一个基于Vue无限滑动选择日期的手机端组件

## DEMO
![demo](demo.gif)

## 安装
```html
npm install --save v-week-slider
```

## 使用
```html
import weekSlider from 'v-week-slider'

Vue.use(weekSlider)

<week-slider></week-slider>
```   

## Props
|prop|必选|类型|说明|
|:----    |:---|:----- |-----   |
|defaultDate   | false  | String  | 指定日期，默认今天，YYYY-MM-DD |
| showYear  | false  | Boolean  | 是否显示当前周所属年月，默认false  |

## events
|名称|说明|回调参数|
|:----    |:---|:----- |
| dateClick  | 点击日期触发时间  |  点击的日期（YYYY-MM-DD） |
